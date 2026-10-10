const quizTopics = window.quizTopics || {};
const REQUIRED_DISTRIBUTION = Object.freeze({
  single: 5,
  double: 5,
  tf: 4,
  identification: 5,
  sequence: 1
});
const MODE_TOTALS = Object.freeze(REQUIRED_DISTRIBUTION);
const BANK_DISTRIBUTION = Object.freeze({
  single: 25,
  double: 25,
  tf: 25,
  identification: 21,
  sequence: 5
});
const MODE_LABELS = Object.freeze({
  single: 'single-answer',
  double: 'double-answer',
  tf: 'true/false',
  identification: 'identification',
  sequence: 'sequence'
});
const roastLines = [
  'Close, but the details need another look.',
  'That one belongs in the review notes.',
  'A useful wrong answer: now you know what to revisit.',
  'Not quite. Check the key term and try the next one.',
  'Good attempt; the module has the missing piece.',
  'The answer was nearby, just not this time.',
  'Keep going. One missed question does not define the run.',
  'A quick review of that concept will pay off.',
  'That choice has potential, but it is not the best answer.',
  'Worth revisiting before the next quiz.',
  'The study fact below points to the important detail.',
  'A small detour—use it to strengthen the next answer.'
];

const STORAGE_KEY = 'itpQuizUsedQuestions';
const STATE_STORAGE_KEY = 'itpQuizActiveState';

const state = {
  name: localStorage.getItem('itpQuizName') || '',
  phone: localStorage.getItem('itpQuizPhone') || '',
  selectedTopicId: null,
  selectedTopicIds: [],
  isCustom: false,
  quizSize: 20,
  modeTotals: { ...MODE_TOTALS },
  activeTopicId: null,
  questions: [],
  index: 0,
  score: 0,
  selections: [],
  answered: false,
  byMode: { single: 0, double: 0, tf: 0, identification: 0, sequence: 0 },
  review: [],
  boots: Number(localStorage.getItem('itpQuizBoots') || 7),
  currentScreen: 'start'
};

function getModeDistribution(size, custom = false) {
  if (!custom) return { ...REQUIRED_DISTRIBUTION };
  const sequence = size <= 20 ? 1 : size <= 40 ? 2 : 3;
  const remaining = size - sequence;
  const modes = ['single', 'double', 'tf', 'identification'];
  return modes.reduce((result, mode, index) => ({ ...result, [mode]: Math.floor(remaining / 4) + (index < remaining % 4 ? 1 : 0) }), { sequence });
}


const $ = (selector) => document.querySelector(selector);
const screens = {
  start: $('#start-screen'),
  question: $('#question-screen'),
  results: $('#results-screen')
};
const slideViewer = $('#slide-viewer');
const slideViewerFrame = $('#slide-viewer-frame');
let slideViewerTrigger = null;
const supplementalSections = document.querySelectorAll('.hero, .stats-strip, .dumb-zone, .footer');

function shuffle(items) {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[randomIndex]] = [copy[randomIndex], copy[index]];
  }
  return copy;
}

function getUsedQuestions() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return saved && typeof saved === 'object' ? saved : {};
  } catch {
    return {};
  }
}

function saveUsedQuestions(usedMap) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(usedMap));
}

function saveActiveState() {
  localStorage.setItem(STATE_STORAGE_KEY, JSON.stringify(state));
}

function getTopicValidation(topicId) {
  const topic = quizTopics[topicId];
  if (!topic) {
    return { valid: false, missing: ['topic data'] };
  }

  const questions = topic.questions || {};
  const missing = Object.entries(REQUIRED_DISTRIBUTION)
    .filter(([mode, minimum]) => (questions[mode] || []).length < minimum)
    .map(([mode, minimum]) => `${minimum - (questions[mode] || []).length} more ${MODE_LABELS[mode]}`);

  return { valid: missing.length === 0, missing };
}

function getTopicBankStats(topicId) {
  const topic = quizTopics[topicId];
  const questions = topic && topic.questions ? topic.questions : {};
  const counts = Object.keys(BANK_DISTRIBUTION).reduce((result, mode) => {
    result[mode] = Array.isArray(questions[mode]) ? questions[mode].length : 0;
    return result;
  }, {});

  return {
    counts,
    total: Object.values(counts).reduce((total, count) => total + count, 0)
  };
}

function renderTopicSelection() {
  const nameEntry = $('#name-entry');
  const startGrid = document.querySelector('.start-grid');
  const hasName = state.name.length === 4 && state.phone.length === 11;
  if (nameEntry) nameEntry.classList.toggle('hidden', hasName);
  if (startGrid) startGrid.classList.toggle('hidden', !hasName);

  document.querySelectorAll('.topic-option').forEach((button) => {
    const topicId = button.dataset.topicId;
    const topic = quizTopics[topicId];
    const validation = getTopicValidation(topicId);
    const selected = state.isCustom ? state.selectedTopicIds.includes(topicId) : state.selectedTopicId === topicId;
    const status = button.querySelector('[data-topic-status]');

    button.classList.toggle('is-selected', selected);
    button.classList.toggle('is-valid', validation.valid);
    button.classList.toggle('is-invalid', !validation.valid);
    button.setAttribute('role', state.isCustom ? 'checkbox' : 'radio');
    button.setAttribute('aria-checked', String(selected));
    if (status) {
      const bankStats = getTopicBankStats(topicId);
      status.textContent = validation.valid
        ? `${bankStats.total}-question bank`
        : `Needs ${validation.missing.join(', ')}`;
    }
    if (topic) {
      const title = button.querySelector('[data-topic-title]');
      const description = button.querySelector('[data-topic-description]');
      if (title) title.textContent = `${topic.label} // ${topic.title}`;
      if (description) description.textContent = topic.description;
    }
  });

  const selectedTopic = quizTopics[state.selectedTopicId];
  const selectedIds = state.isCustom ? state.selectedTopicIds : [state.selectedTopicId].filter(Boolean);
  const distribution = getModeDistribution(state.quizSize, state.isCustom);
  const selectedValidation = state.isCustom
    ? { valid: selectedIds.length > 0 && Object.entries(distribution).every(([mode, count]) => selectedIds.reduce((total, id) => total + (quizTopics[id]?.questions?.[mode]?.length || 0), 0) >= count), missing: [] }
    : getTopicValidation(state.selectedTopicId);
  const validationMessage = $('#topic-validation');
  const startButton = $('#start-btn');
  const resumeButton = $('#resume-btn');

  if (validationMessage) {
    if (!selectedIds.length) {
      validationMessage.textContent = state.isCustom ? 'Select one or more available topics.' : 'Select a topic to check its question set.';
      validationMessage.className = 'topic-validation';
    } else if (selectedValidation.valid) {
      validationMessage.textContent = state.isCustom ? `${selectedIds.length} topic(s) selected // ${state.quizSize} questions.` : `${selectedTopic.label} has a ${getTopicBankStats(state.selectedTopicId).total}-question bank. Each session draws 5 single, 5 double, 4 true/false, 5 identification, and 1 sequence question.`;
      validationMessage.className = 'topic-validation is-valid';
    } else {
      validationMessage.textContent = `This topic cannot start yet: ${selectedValidation.missing.join(', ')}.`;
      validationMessage.className = 'topic-validation is-invalid';
    }
  }

  if (startButton) {
    startButton.disabled = !hasName || !selectedValidation.valid;
    startButton.querySelector('span').textContent = selectedValidation.valid
      ? state.isCustom ? `START CUSTOM ${state.quizSize}` : `RUN ${selectedTopic.label.toUpperCase()}`
      : 'SELECT A TOPIC';
  }

  if (resumeButton) {
    const activeTopic = quizTopics[state.activeTopicId];
    const canResume = activeTopic && state.questions.length > 0 && state.index < state.questions.length;
    resumeButton.classList.toggle('hidden', !canResume);
    if (canResume) resumeButton.textContent = `RESUME ${activeTopic.label.toUpperCase()} // ${String(state.index + 1).padStart(2, '0')} / ${state.questions.length}`;
  }
}

function selectTopic(topicId) {
  if (!quizTopics[topicId]) return;
  if (state.isCustom) state.selectedTopicIds = state.selectedTopicIds.includes(topicId) ? state.selectedTopicIds.filter((id) => id !== topicId) : [...state.selectedTopicIds, topicId];
  else { state.selectedTopicId = topicId; state.selectedTopicIds = [topicId]; }
  state.currentScreen = 'start';
  renderTopicSelection();
  showScreen('start');
  saveActiveState();
}

function getQuestionsForMode(topicId, mode, count, usedMap) {
  const topic = quizTopics[topicId];
  if (!topic || !topic.questions[mode]) return [];

  if (!usedMap[topicId] || Array.isArray(usedMap[topicId])) {
    usedMap[topicId] = {};
  }
  if (!Array.isArray(usedMap[topicId][mode])) {
    usedMap[topicId][mode] = [];
  }

  const history = usedMap[topicId][mode];
  const pool = topic.questions[mode];
  let available = pool.filter((question) => !history.includes(question.id));

  if (available.length < count) {
    usedMap[topicId][mode] = [];
    available = pool;
  }

  const selected = shuffle(available).slice(0, count);
  selected.forEach((question) => {
    if (!usedMap[topicId][mode].includes(question.id)) {
      usedMap[topicId][mode].push(question.id);
    }
  });

  return selected.map((question) => shuffleQuestionLayout(question, mode));
}

function getQuestionsForTopics(topicIds, mode, count, usedMap) {
  const pool = topicIds.flatMap((topicId) => {
    const topic = quizTopics[topicId];
    if (!usedMap[topicId]) usedMap[topicId] = {};
    if (!Array.isArray(usedMap[topicId][mode])) usedMap[topicId][mode] = [];
    let available = topic.questions[mode].filter((question) => !usedMap[topicId][mode].includes(question.id));
    if (!available.length) { usedMap[topicId][mode] = []; available = topic.questions[mode]; }
    return available.map((question) => ({ topicId, question }));
  });
  const chosen = shuffle(pool).slice(0, count);
  chosen.forEach(({ topicId, question }) => usedMap[topicId][mode].push(question.id));
  return chosen.map(({ question }) => shuffleQuestionLayout(question, mode));
}

function shuffleQuestionLayout(question, mode) {
  const configuredQuestion = { ...question, mode };

  if (['single', 'double', 'tf'].includes(mode)) {
    const indexedOptions = question.options.map((option, index) => ({ option, index }));
    const shuffledOptions = shuffle(indexedOptions);
    let mappedAnswers = question.answer.map((answerIndex) =>
      shuffledOptions.findIndex(({ index }) => index === answerIndex)
    );

    if (mappedAnswers.slice().sort((a, b) => a - b).join(',') === '0,1') {
      [shuffledOptions[1], shuffledOptions[2]] = [shuffledOptions[2], shuffledOptions[1]];
      mappedAnswers = question.answer.map((answerIndex) =>
        shuffledOptions.findIndex(({ index }) => index === answerIndex)
      );
    }

    configuredQuestion.options = shuffledOptions.map(({ option }) => option);
    configuredQuestion.answer = mappedAnswers;
  } else if (mode === 'sequence') {
    const indexedSteps = question.steps.map((step, index) => ({ step, index }));
    const shuffledSteps = shuffle(indexedSteps);

    if (shuffledSteps.every(({ index }, position) => index === position)) {
      [shuffledSteps[0], shuffledSteps[1]] = [shuffledSteps[1], shuffledSteps[0]];
    }

    configuredQuestion.steps = shuffledSteps.map(({ step }) => step);
    configuredQuestion.answer = question.answer.map((answerIndex) =>
      shuffledSteps.findIndex(({ index }) => index === answerIndex)
    );
  }

  return configuredQuestion;
}

function buildSession() {
  const topicIds = state.isCustom ? state.selectedTopicIds : [state.selectedTopicId];
  const distribution = getModeDistribution(state.quizSize, state.isCustom);
  const validation = state.isCustom
    ? { valid: topicIds.length > 0 && Object.entries(distribution).every(([mode, count]) => topicIds.reduce((total, id) => total + (quizTopics[id]?.questions?.[mode]?.length || 0), 0) >= count) }
    : getTopicValidation(state.selectedTopicId);
  if (!validation.valid) {
    renderTopicSelection();
    showScreen('start');
    return false;
  }

  const usedMap = getUsedQuestions();
  state.questions = Object.entries(distribution).flatMap(([mode, count]) => getQuestionsForTopics(topicIds, mode, count, usedMap));
  state.selectedTopicId = topicIds[0];
  state.activeTopicId = topicIds[0];
  state.modeTotals = distribution;

  saveUsedQuestions(usedMap);
  state.questions = shuffle(state.questions);
  state.index = 0;
  state.score = 0;
  state.selections = [];
  state.answered = false;
  state.byMode = { single: 0, double: 0, tf: 0, identification: 0, sequence: 0 };
  state.review = [];
  state.boots += 1;
  localStorage.setItem('itpQuizBoots', String(state.boots));
  $('#boot-count').textContent = String(state.boots).padStart(4, '0');
  saveActiveState();
  return true;
}

function showScreen(name) {
  state.currentScreen = name;
  Object.values(screens).forEach((screen) => screen.classList.add('hidden'));
  if (screens[name]) screens[name].classList.remove('hidden');
  supplementalSections.forEach((section) => section.classList.toggle('hidden', name !== 'start'));
  saveActiveState();
}

function modeName(mode) {
  return {
    single: 'SINGLE ANSWER',
    double: 'DOUBLE ANSWER',
    tf: 'TRUE / FALSE',
    identification: 'IDENTIFICATION',
    sequence: 'SEQUENCE'
  }[mode];
}

function correctAnswerText(question) {
  if (question.mode === 'identification') return question.answer[0];
  if (question.mode === 'sequence') {
    return question.answer.map((answerIndex) => question.steps[answerIndex]).join(' -> ');
  }
  return question.answer.map((answerIndex) => question.options[answerIndex]).join(', ');
}

const MODULE_SLIDES_URL = 'https://anjelic03.github.io/ITP141-Modules/';
const TOPIC_MODULE_IDS = Object.freeze({
  1: '1.1', 2: '1.2', 3: '1.3', 6: '1.6', 7: '1.7', 8: '2.8', 9: '3.9',
  10: '4.10', 11: '4.11', 12: '4.12', 13: '5.13', 14: '5.14', 15: '6.15', 16: '6.16'
});

function getFactSlideUrl(question) {
  const match = /^m(\d+)-t(\d+)-/.exec(question.id || '');
  if (!match || !question.fact) return MODULE_SLIDES_URL;
  const moduleId = TOPIC_MODULE_IDS[Number(match[2])] || `${match[1]}.${match[2]}`;
  const url = new URL(MODULE_SLIDES_URL);
  url.searchParams.set('mod', moduleId);
  url.searchParams.set('topic', question.topic);
  url.searchParams.set('fact', question.fact);
  url.searchParams.set('prompt', question.text);
  return url.toString();
}

function clearFactReference() {
  $('#fact-text').textContent = '';
  $('#fact-reference-title').textContent = 'STUDY FACT (BETA)';
  $('#fact-slide-link').removeAttribute('href');
  $('#fact-reference').classList.add('hidden');
}

function showFactReference(question) {
  if (!question.fact) return;
  $('#fact-text').textContent = question.fact;
  const topicMatch = /^m\d+-t(\d+)-/.exec(question.id || '');
  const hasSlideLink = topicMatch?.[1] !== '1';
  $('#fact-reference-title').textContent = hasSlideLink ? 'STUDY FACT (BETA)' : 'STUDY FACT';
  const factLink = $('#fact-slide-link');
  if (hasSlideLink) factLink.href = getFactSlideUrl(question);
  else factLink.removeAttribute('href');
  factLink.classList.toggle('hidden', !hasSlideLink);
  $('#fact-reference').classList.remove('hidden');
}

function openSlideViewer(url, trigger) {
  if (!url) return;
  slideViewerTrigger = trigger;
  slideViewerFrame.src = url;
  slideViewer.classList.remove('hidden');
  $('#close-slide-viewer').focus();
}

function closeSlideViewer() {
  if (slideViewer.classList.contains('hidden')) return;
  slideViewer.classList.add('hidden');
  slideViewerFrame.src = 'about:blank';
  slideViewerTrigger?.focus();
  slideViewerTrigger = null;
}

function renderQuestion() {
  const question = state.questions[state.index];
  if (!question) return;

  const questionNumber = String(state.index + 1).padStart(2, '0');
  const isLastQuestion = state.index === state.questions.length - 1;
  $('#question-number').textContent = questionNumber;
  $('#player-name').textContent = state.name;
  $('#player-phone').textContent = state.phone;
  $('#question-count').textContent = `${questionNumber} / ${state.questions.length}`;
  const topicMatch = /^m(\d+)-t(\d+)-/.exec(question.id || '');
  $('#current-topic-indicator').textContent = topicMatch ? `TOPIC ${topicMatch[2].padStart(2, '0')}` : 'CUSTOM QUIZ';
  $('#mode-label').textContent = modeName(question.mode);
  $('#topic-label').textContent = question.topic;
  $('#question-text').textContent = question.text;

  if (question.mode === 'single') $('#question-hint').textContent = 'SELECT ONE';
  else if (question.mode === 'double') $('#question-hint').textContent = 'SELECT EXACTLY TWO';
  else if (question.mode === 'tf') $('#question-hint').textContent = 'SELECT TRUE OR FALSE';
  else if (question.mode === 'identification') $('#question-hint').textContent = 'TYPE THE TERM';
  else if (question.mode === 'sequence') $('#question-hint').textContent = `ORDER THE STEPS (1 TO ${question.steps.length})`;

  $('#progress-bar').style.width = `${((state.index + 1) / state.questions.length) * 100}%`;
  $('#live-score').textContent = String(state.score).padStart(2, '0');

  if (question.mode === 'double') $('#selection-note').textContent = 'Two answers. Not one. Not three. Two.';
  else if (question.mode === 'sequence') $('#selection-note').textContent = 'Click steps in the correct chronological order.';
  else $('#selection-note').textContent = 'Select an answer to continue.';
  $('#selection-note').style.color = '';
  $('#answer-reveal').textContent = '';
  $('#answer-reveal').classList.add('hidden');
  clearFactReference();

  $('#next-label').textContent = isLastQuestion ? 'END THE CHAOS' : 'LOCK IT IN';
  $('#next-btn').disabled = true;
  $('#previous-btn').disabled = state.index === 0;
  $('#answers').innerHTML = '';
  $('#answers').classList.toggle('hidden', question.mode === 'identification' || question.mode === 'sequence');
  $('#text-answer-wrap').classList.toggle('hidden', question.mode !== 'identification');

  let sequenceWrap = $('#sequence-wrap');
  if (!sequenceWrap) {
    sequenceWrap = document.createElement('div');
    sequenceWrap.id = 'sequence-wrap';
    sequenceWrap.className = 'sequence-wrap hidden';
    $('.question-card').insertBefore(sequenceWrap, $('#text-answer-wrap'));
  }
  sequenceWrap.classList.toggle('hidden', question.mode !== 'sequence');

  if (question.mode === 'identification') {
    $('#text-answer').value = typeof state.selections[0] === 'string' ? state.selections[0] : '';
    $('#text-answer').disabled = false;
    $('#next-btn').disabled = !$('#text-answer').value.trim();
  } else if (question.mode === 'sequence') {
    renderSequenceWidget(question);
  } else {
    question.options.forEach((option, optionIndex) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'answer-btn';
      if (state.selections.includes(optionIndex)) button.classList.add('selected');
      button.dataset.index = String(optionIndex);
      button.innerHTML = `<span class="answer-letter">${String.fromCharCode(65 + optionIndex)}</span><span class="answer-copy"></span>`;
      button.querySelector('.answer-copy').textContent = option;
      button.addEventListener('click', () => selectOption(optionIndex));
      $('#answers').appendChild(button);
    });
    $('#next-btn').disabled = state.selections.length !== (question.mode === 'double' ? 2 : 1);
  }

  showScreen('question');
  if (state.answered && state.review[state.index]) applyAnswerState(question, state.review[state.index].correct);
}

function renderSequenceWidget(question) {
  const wrap = $('#sequence-wrap');
  wrap.innerHTML = `
    <div class="seq-container">
      <div class="seq-pool-col">
        <h4>Available Steps (Click to order)</h4>
        <div id="seq-pool" class="seq-list"></div>
      </div>
      <div class="seq-selected-col">
        <h4>Your Order</h4>
        <div id="seq-selected" class="seq-list"></div>
      </div>
    </div>
  `;

  if (!Array.isArray(state.selections)) state.selections = [];

  const poolContainer = wrap.querySelector('#seq-pool');
  const selectedContainer = wrap.querySelector('#seq-selected');
  const remainingIndices = question.steps.map((_, index) => index).filter((index) => !state.selections.includes(index));

  remainingIndices.forEach((stepIndex) => {
    const item = document.createElement('div');
    item.className = 'seq-item';
    item.textContent = question.steps[stepIndex];
    item.addEventListener('click', () => {
      state.selections.push(stepIndex);
      renderSequenceWidget(question);
      saveActiveState();
    });
    poolContainer.appendChild(item);
  });

  if (remainingIndices.length === 0) {
    const emptyMessage = document.createElement('div');
    emptyMessage.className = 'seq-empty';
    emptyMessage.textContent = 'All steps ordered!';
    poolContainer.appendChild(emptyMessage);
  }

  state.selections.forEach((stepIndex, position) => {
    const item = document.createElement('div');
    item.className = 'seq-item selected-seq';
    item.innerHTML = `<span class="seq-badge">${position + 1}</span> <span></span>`;
    item.querySelector('span:last-child').textContent = question.steps[stepIndex];
    item.addEventListener('click', () => {
      state.selections.splice(position, 1);
      renderSequenceWidget(question);
      saveActiveState();
    });
    selectedContainer.appendChild(item);
  });

  if (state.selections.length === 0) {
    const emptyMessage = document.createElement('div');
    emptyMessage.className = 'seq-empty';
    emptyMessage.textContent = 'Click available steps on the left.';
    selectedContainer.appendChild(emptyMessage);
  }

  $('#next-btn').disabled = state.selections.length !== question.steps.length;
}

function selectOption(optionIndex) {
  if (state.answered) return;
  const question = state.questions[state.index];
  if (question.mode === 'double') {
    if (state.selections.includes(optionIndex)) {
      state.selections = state.selections.filter((index) => index !== optionIndex);
    } else if (state.selections.length < 2) {
      state.selections.push(optionIndex);
    }
  } else {
    state.selections = [optionIndex];
  }
  document.querySelectorAll('.answer-btn').forEach((button) => {
    button.classList.toggle('selected', state.selections.includes(Number(button.dataset.index)));
  });
  $('#next-btn').disabled = state.selections.length !== (question.mode === 'double' ? 2 : 1);
  saveActiveState();
}

function normalized(value) {
  return value.trim().replace(/\s+/g, ' ').toUpperCase();
}

function applyAnswerState(question, correct) {
  $('#selection-note').textContent = correct ? 'Correct. Nice work.' : roastLines[Math.floor(Math.random() * roastLines.length)];
  $('#selection-note').style.color = correct ? '#2e8d4b' : 'var(--coral)';
  $('#answer-reveal').textContent = `CORRECT ANSWER: ${correctAnswerText(question)}`;
  $('#answer-reveal').classList.remove('hidden');
  showFactReference(question);

  if (question.mode === 'sequence') {
    document.querySelectorAll('.seq-item').forEach((element) => {
      element.style.pointerEvents = 'none';
    });
    document.querySelectorAll('#seq-selected .seq-item').forEach((element, position) => {
      element.classList.toggle('is-correct', state.selections[position] === question.answer[position]);
      element.classList.toggle('is-incorrect', state.selections[position] !== question.answer[position]);
    });
  } else if (question.mode !== 'identification') {
    document.querySelectorAll('.answer-btn').forEach((button) => {
      button.disabled = true;
      const optionIndex = Number(button.dataset.index);
      button.classList.toggle('is-correct', question.answer.includes(optionIndex));
      button.classList.toggle('is-incorrect', state.selections.includes(optionIndex) && !question.answer.includes(optionIndex));
    });
  } else {
    $('#text-answer').disabled = true;
  }

  $('#next-btn').disabled = false;
  $('#next-label').textContent = state.index === state.questions.length - 1 ? 'VIEW REPORT' : 'NEXT QUESTION';
}

function checkAnswer() {
  if (state.answered) return;

  const question = state.questions[state.index];
  let correct = false;
  let submitted = '';
  if (question.mode === 'identification') {
    submitted = normalized($('#text-answer').value);
    correct = question.answer.map(normalized).includes(submitted);
  } else if (question.mode === 'sequence') {
    submitted = state.selections.map((index) => question.steps[index]).join(' -> ');
    correct = JSON.stringify(state.selections) === JSON.stringify(question.answer);
  } else {
    submitted = state.selections.map((index) => question.options[index]).join(', ');
    correct = [...state.selections].sort().join(',') === [...question.answer].sort().join(',');
  }

  state.answered = true;
  if (correct) {
    state.score += 1;
    state.byMode[question.mode] += 1;
  }
  state.review.push({ question, correct, submitted, selections: [...state.selections] });
  $('#live-score').textContent = String(state.score).padStart(2, '0');
  applyAnswerState(question, correct);
  saveActiveState();
}

function renderResults() {
  showScreen('results');
  const percentage = state.score / state.questions.length;
  const topic = quizTopics[state.selectedTopicId];
  const topicText = topic ? `${topic.label} // ${topic.title} // ${getTopicBankStats(state.selectedTopicId).total}-QUESTION BANK` : '';
  $('#result-topic').textContent = topicText;
  $('#result-name').textContent = `NAME // ${state.name} // PHONE // ${state.phone}`;
  $('#final-score').textContent = String(state.score).padStart(2, '0');
  const titles = percentage >= .9 ? ['Excellent work.', 'Strong command of the material.'] : percentage >= .7 ? ['Good progress.', 'A solid result with room to refine.'] : percentage >= .5 ? ['You are building momentum.', 'Review the missed concepts and try again.'] : ['Keep studying.', 'The results point to what to review next.'];
  $('#result-title').textContent = titles[Math.floor(Math.random() * titles.length)];

  const resultModes = { single: 'single', double: 'double', tf: 'tf', identification: 'id', sequence: 'seq' };
  Object.entries(resultModes).forEach(([mode, id]) => {
    const value = state.byMode[mode] || 0;
    const total = state.modeTotals?.[mode] || 0;
    if ($(`#${id}-result`)) $(`#${id}-result`).textContent = `${value}/${total}`;
    if ($(`#${id}-meter`)) $(`#${id}-meter`).style.width = total ? `${(value / total) * 100}%` : '0%';
  });

  $('#roast-text').textContent = percentage >= .9 ? 'Excellent recall. Keep that study rhythm going.' : percentage >= .7 ? 'A strong attempt. The review section can help sharpen the remaining details.' : percentage >= .5 ? 'You have a useful base. Focus on the study facts for the questions you missed.' : 'Use the review section as a checklist, then return when you are ready.';
  $('#review-list').classList.add('hidden');
  saveActiveState();
}

function renderReview() {
  const list = $('#review-list');
  list.innerHTML = state.review.map((item, index) => {
    const answer = correctAnswerText(item.question);
    return `<div class="review-item ${item.correct ? 'correct' : 'wrong'}"><strong>${String(index + 1).padStart(2, '0')}</strong><div><p>${item.question.text}</p><small>${item.correct ? 'CORRECT' : `YOU: ${item.submitted || 'NO ANSWER'} // CORRECT: ${answer}`}</small></div></div>`;
  }).join('');
  list.classList.toggle('hidden');
  $('#review-btn').innerHTML = list.classList.contains('hidden') ? 'VIEW ANSWERS <span>v</span>' : 'HIDE ANSWERS <span>^</span>';
}

function resetToTopicSelection() {
  state.selectedTopicId = null;
  state.modeTotals = { ...MODE_TOTALS };
  state.activeTopicId = null;
  state.questions = [];
  state.index = 0;
  state.score = 0;
  state.selections = [];
  state.answered = false;
  state.byMode = { single: 0, double: 0, tf: 0, identification: 0, sequence: 0 };
  state.review = [];
  renderTopicSelection();
  showScreen('start');
  window.scrollTo({ top: $('#quiz-app').offsetTop - 25, behavior: 'smooth' });
}

const themeToggleBtn = $('#theme-toggle');
const savedTheme = localStorage.getItem('itpQuizTheme');
if (savedTheme === 'light') document.documentElement.setAttribute('data-theme', 'light');

function updateThemeIcon() {
  const isLight = document.documentElement.getAttribute('data-theme') === 'light';
  if (themeToggleBtn) themeToggleBtn.textContent = isLight ? 'MOON' : 'SUN';
}
updateThemeIcon();

const namePreview = $('#name-preview');
const phoneSlider = $('#phone-slider');
const phonePreview = $('#phone-preview');
const nameConfirmButton = $('#name-confirm-btn');
const nameSelectors = document.querySelectorAll('.name-character');
const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

nameSelectors.forEach((select) => {
  letters.split('').forEach((letter) => {
    const option = document.createElement('option');
    option.value = letter;
    option.textContent = letter;
    select.appendChild(option);
  });
  select.addEventListener('change', () => {
    namePreview.textContent = Array.from(nameSelectors, (item) => item.value).join('');
  });
});

phoneSlider.addEventListener('input', () => {
  phonePreview.textContent = `09${String(phoneSlider.value).padStart(9, '0')}`;
});

nameConfirmButton.addEventListener('click', () => {
  state.name = Array.from(nameSelectors, (select) => select.value).join('');
  state.phone = phonePreview.textContent;
  localStorage.setItem('itpQuizName', state.name);
  localStorage.setItem('itpQuizPhone', state.phone);
  renderTopicSelection();
  saveActiveState();
});

if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    if (isLight) {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('itpQuizTheme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('itpQuizTheme', 'light');
    }
    updateThemeIcon();
  });
}

document.querySelectorAll('.topic-option').forEach((button, index, buttons) => {
  button.addEventListener('click', () => selectTopic(button.dataset.topicId));
  button.addEventListener('dblclick', () => {
    if (state.isCustom || !getTopicValidation(button.dataset.topicId).valid) return;
    state.selectedTopicId = button.dataset.topicId;
    if (buildSession()) renderQuestion();
  });
  button.addEventListener('keydown', (event) => {
    if (!['ArrowDown', 'ArrowRight', 'ArrowUp', 'ArrowLeft'].includes(event.key)) return;
    event.preventDefault();
    const direction = event.key === 'ArrowDown' || event.key === 'ArrowRight' ? 1 : -1;
    buttons[(index + direction + buttons.length) % buttons.length].focus();
  });
});

function setQuizMode(custom) {
  state.isCustom = custom;
  if (custom && !state.selectedTopicIds.length && state.selectedTopicId) state.selectedTopicIds = [state.selectedTopicId];
  $('#custom-settings').classList.toggle('hidden', !custom);
  $('#standard-mode-btn').classList.toggle('is-selected', !custom);
  $('#custom-mode-btn').classList.toggle('is-selected', custom);
  renderTopicSelection();
}
$('#standard-mode-btn').addEventListener('click', () => setQuizMode(false));
$('#custom-mode-btn').addEventListener('click', () => setQuizMode(true));
document.querySelectorAll('[data-quiz-size]').forEach((button) => button.addEventListener('click', () => {
  state.quizSize = Number(button.dataset.quizSize);
  document.querySelectorAll('[data-quiz-size]').forEach((item) => item.classList.toggle('is-selected', item === button));
  renderTopicSelection();
}));

$('#start-btn').addEventListener('click', () => {
  if (buildSession()) renderQuestion();
});
$('#resume-btn').addEventListener('click', () => {
  if (!state.activeTopicId || !state.questions.length) return;
  state.selectedTopicId = state.activeTopicId;
  renderQuestion();
  window.scrollTo({ top: $('#quiz-app').offsetTop - 25, behavior: 'smooth' });
});
$('#retake-btn').addEventListener('click', () => {
  localStorage.removeItem(STATE_STORAGE_KEY);
  if (buildSession()) {
    renderQuestion();
    window.scrollTo({ top: $('#quiz-app').offsetTop - 25, behavior: 'smooth' });
  }
});
$('#change-topic-btn').addEventListener('click', resetToTopicSelection);
$('.brand').addEventListener('click', (event) => {
  event.preventDefault();
  renderTopicSelection();
  showScreen('start');
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
$('#home-btn').addEventListener('click', () => {
  renderTopicSelection();
  showScreen('start');
  window.scrollTo({ top: $('#quiz-app').offsetTop - 25, behavior: 'smooth' });
});
$('#next-btn').addEventListener('click', () => {
  if (!state.answered) {
    checkAnswer();
  } else if (state.index < state.questions.length - 1) {
    state.index += 1;
    const reviewed = state.review[state.index];
    state.selections = reviewed?.selections ? [...reviewed.selections] : [];
    state.answered = Boolean(reviewed);
    renderQuestion();
  } else {
    renderResults();
  }
});
$('#previous-btn').addEventListener('click', () => {
  if (state.index === 0) return;
  state.index -= 1;
  const reviewed = state.review[state.index];
  state.selections = reviewed?.selections ? [...reviewed.selections] : [];
  state.answered = Boolean(reviewed);
  renderQuestion();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !slideViewer.classList.contains('hidden')) {
    event.preventDefault();
    closeSlideViewer();
    return;
  }
  if (event.key !== 'Enter' || event.defaultPrevented || state.currentScreen !== 'question') return;
  if (['INPUT', 'TEXTAREA', 'SELECT', 'BUTTON'].includes(event.target.tagName)) return;

  const nextButton = $('#next-btn');
  if (!nextButton.disabled) {
    event.preventDefault();
    nextButton.click();
  }
});
$('#review-btn').addEventListener('click', renderReview);
$('#fact-slide-link').addEventListener('click', (event) => {
  event.preventDefault();
  openSlideViewer(event.currentTarget.href, event.currentTarget);
});
$('#close-slide-viewer').addEventListener('click', closeSlideViewer);
$('#text-answer').addEventListener('input', (event) => {
  event.target.value = event.target.value.toUpperCase();
  state.selections = [event.target.value];
  $('#next-btn').disabled = event.target.value.trim().length === 0 || state.answered;
  saveActiveState();
});
$('#text-answer').addEventListener('keydown', (event) => {
  if (event.key !== 'Enter' || event.isComposing) return;
  event.preventDefault();
  if (!$('#next-btn').disabled) $('#next-btn').click();
});
$('#boot-count').textContent = String(state.boots).padStart(4, '0');

function loadActiveState() {
  try {
    const saved = localStorage.getItem(STATE_STORAGE_KEY);
    if (!saved) return false;
    const parsed = JSON.parse(saved);
    const validation = getTopicValidation(parsed && parsed.selectedTopicId);
    if (parsed && Array.isArray(parsed.questions) && parsed.questions.length > 0 && validation.valid) {
      Object.assign(state, parsed);
      state.modeTotals = state.modeTotals || { ...MODE_TOTALS };
      return true;
    }
  } catch (error) {
    console.error('Failed to load state', error);
  }
  return false;
}

window.addEventListener('DOMContentLoaded', () => {
  $('#boot-count').textContent = String(state.boots).padStart(4, '0');
  renderTopicSelection();
  if (loadActiveState()) {
    renderTopicSelection();
    if (state.currentScreen === 'question' && state.questions.length > 0) {
      renderQuestion();
      if (state.answered && state.review.length > 0) {
        const lastReview = state.review[state.review.length - 1];
        applyAnswerState(lastReview.question, lastReview.correct);
      }
    } else if (state.currentScreen === 'results') {
      renderResults();
    } else {
      showScreen('start');
    }
  } else {
    showScreen('start');
  }
});
