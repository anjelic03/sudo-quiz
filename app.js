const quizTopics = window.quizTopics || {};
const REQUIRED_DISTRIBUTION = Object.freeze({
  single: 5,
  double: 5,
  tf: 5,
  identification: 3,
  sequence: 2
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
  'That answer was so wrong it needs its own incident ticket.',
  'You just rebooted the problem and called it troubleshooting.',
  'Your brain is currently running on dial-up. Please wait.',
  'Even the log file is embarrassed by that choice.',
  'That was not a configuration. That was a cry for help.',
  'Somewhere, a tiny server just lost faith in you.',
  'You have achieved maximum confidence with minimum accuracy.',
  'The answer fell over harder than a service with no dependencies.',
  'A packet was sent to your brain. It timed out.',
  'Bold choice. Incorrect, but bold. Like chmod 777 on production.',
  'Your knowledge base returned: 404 Not Found.',
  'Congratulations: you have invented a new kind of configuration drift.'
];

const STORAGE_KEY = 'itpQuizUsedQuestions';
const STATE_STORAGE_KEY = 'itpQuizActiveState';

const state = {
  name: localStorage.getItem('itpQuizName') || '',
  phone: localStorage.getItem('itpQuizPhone') || '',
  selectedTopicId: null,
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

const $ = (selector) => document.querySelector(selector);
const screens = {
  start: $('#start-screen'),
  question: $('#question-screen'),
  results: $('#results-screen')
};
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
    const selected = state.selectedTopicId === topicId;
    const status = button.querySelector('[data-topic-status]');

    button.classList.toggle('is-selected', selected);
    button.classList.toggle('is-valid', validation.valid);
    button.classList.toggle('is-invalid', !validation.valid);
    button.setAttribute('aria-checked', String(selected));
    if (status) {
      const bankStats = getTopicBankStats(topicId);
      status.textContent = validation.valid
        ? `${bankStats.total}-question bank // 20-question session`
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
  const selectedValidation = getTopicValidation(state.selectedTopicId);
  const validationMessage = $('#topic-validation');
  const startButton = $('#start-btn');
  const resumeButton = $('#resume-btn');

  if (validationMessage) {
    if (!state.selectedTopicId) {
      validationMessage.textContent = 'Select a topic to check its question set.';
      validationMessage.className = 'topic-validation';
    } else if (selectedValidation.valid) {
      const bankStats = getTopicBankStats(state.selectedTopicId);
      validationMessage.textContent = `${selectedTopic.label} has a ${bankStats.total}-question bank. Each session draws 5 single, 5 double, 5 true/false, 3 identification, and 2 sequence questions (20 total).`;
      validationMessage.className = 'topic-validation is-valid';
    } else {
      validationMessage.textContent = `This topic cannot start yet: ${selectedValidation.missing.join(', ')}.`;
      validationMessage.className = 'topic-validation is-invalid';
    }
  }

  if (startButton) {
    startButton.disabled = !hasName || !selectedValidation.valid;
    startButton.querySelector('span').textContent = selectedTopic && selectedValidation.valid
      ? `RUN ${selectedTopic.label.toUpperCase()}`
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
  state.selectedTopicId = topicId;
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
  const validation = getTopicValidation(state.selectedTopicId);
  if (!validation.valid) {
    renderTopicSelection();
    showScreen('start');
    return false;
  }

  const usedMap = getUsedQuestions();
  state.questions = [
    ...getQuestionsForMode(state.selectedTopicId, 'single', 5, usedMap),
    ...getQuestionsForMode(state.selectedTopicId, 'double', 5, usedMap),
    ...getQuestionsForMode(state.selectedTopicId, 'tf', 5, usedMap),
    ...getQuestionsForMode(state.selectedTopicId, 'identification', 3, usedMap),
    ...getQuestionsForMode(state.selectedTopicId, 'sequence', 2, usedMap)
  ];
  state.activeTopicId = state.selectedTopicId;

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

function renderQuestion() {
  const question = state.questions[state.index];
  if (!question) return;

  const questionNumber = String(state.index + 1).padStart(2, '0');
  const isLastQuestion = state.index === state.questions.length - 1;
  $('#question-number').textContent = questionNumber;
  $('#player-name').textContent = state.name;
  $('#player-phone').textContent = state.phone;
  $('#question-count').textContent = `${questionNumber} / ${state.questions.length}`;
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

  $('#next-label').textContent = isLastQuestion ? 'END THE CHAOS' : 'LOCK IT IN';
  $('#next-btn').disabled = true;
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
  $('#selection-note').textContent = correct ? 'CORRECT. The server remains upright. For now.' : roastLines[Math.floor(Math.random() * roastLines.length)];
  $('#selection-note').style.color = correct ? '#2e8d4b' : 'var(--coral)';

  if (question.mode === 'sequence') {
    document.querySelectorAll('.seq-item').forEach((element) => {
      element.style.pointerEvents = 'none';
    });
  } else if (question.mode !== 'identification') {
    document.querySelectorAll('.answer-btn').forEach((button) => {
      button.disabled = true;
      const optionIndex = Number(button.dataset.index);
      if (question.answer.includes(optionIndex)) button.style.borderColor = '#2e8d4b';
      if (state.selections.includes(optionIndex) && !question.answer.includes(optionIndex)) button.style.background = 'var(--pink)';
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
  state.review.push({ question, correct, submitted });
  $('#live-score').textContent = String(state.score).padStart(2, '0');
  applyAnswerState(question, correct);
  saveActiveState();
}

function renderResults() {
  showScreen('results');
  const percentage = state.score / state.questions.length;
  const topic = quizTopics[state.selectedTopicId];
  const bankStats = getTopicBankStats(state.selectedTopicId);
  $('#result-topic').textContent = topic ? `${topic.label} // ${topic.title} // ${bankStats.total}-QUESTION BANK` : '';
  $('#result-name').textContent = `OPERATOR // ${state.name} // ${state.phone}`;
  $('#final-score').textContent = String(state.score).padStart(2, '0');
  const titles = percentage >= .9 ? ['Disturbingly competent.', 'The server fears you now.'] : percentage >= .7 ? ['Mostly operational.', 'A few processes escaped.'] : percentage >= .5 ? ['Technically alive.', 'Please do not touch production.'] : ['Critical failure.', 'The logs have been notified.'];
  $('#result-title').textContent = titles[Math.floor(Math.random() * titles.length)];

  const resultModes = { single: 'single', double: 'double', tf: 'tf', identification: 'id', sequence: 'seq' };
  Object.entries(resultModes).forEach(([mode, id]) => {
    const value = state.byMode[mode] || 0;
    const total = MODE_TOTALS[mode];
    if ($(`#${id}-result`)) $(`#${id}-result`).textContent = `${value}/${total}`;
    if ($(`#${id}-meter`)) $(`#${id}-meter`).style.width = `${(value / total) * 100}%`;
  });

  $('#roast-text').textContent = state.score === 20 ? 'You got everything right. Suspicious. Check your keyboard for an answer key.' : state.score >= 15 ? 'Not bad. Your services may survive a weekend, provided nobody opens a terminal.' : state.score >= 10 ? roastLines[Math.floor(Math.random() * roastLines.length)] : 'Your quiz instance has entered a low-availability state. Study the module, then come back louder.';
  $('#review-list').classList.add('hidden');
  saveActiveState();
}

function renderReview() {
  const list = $('#review-list');
  list.innerHTML = state.review.map((item, index) => {
    let answer = '';
    if (item.question.mode === 'identification') {
      answer = item.question.answer[0];
    } else if (item.question.mode === 'sequence') {
      answer = item.question.answer.map((answerIndex) => item.question.steps[answerIndex]).join(' -> ');
    } else {
      answer = item.question.answer.map((answerIndex) => item.question.options[answerIndex]).join(', ');
    }
    return `<div class="review-item ${item.correct ? 'correct' : 'wrong'}"><strong>${String(index + 1).padStart(2, '0')}</strong><div><p>${item.question.text}</p><small>${item.correct ? 'CORRECT' : `YOU: ${item.submitted || 'NO ANSWER'} // CORRECT: ${answer}`}</small></div></div>`;
  }).join('');
  list.classList.toggle('hidden');
  $('#review-btn').innerHTML = list.classList.contains('hidden') ? 'VIEW ANSWERS <span>v</span>' : 'HIDE ANSWERS <span>^</span>';
}

function resetToTopicSelection() {
  state.selectedTopicId = null;
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
  button.addEventListener('keydown', (event) => {
    if (!['ArrowDown', 'ArrowRight', 'ArrowUp', 'ArrowLeft'].includes(event.key)) return;
    event.preventDefault();
    const direction = event.key === 'ArrowDown' || event.key === 'ArrowRight' ? 1 : -1;
    buttons[(index + direction + buttons.length) % buttons.length].focus();
  });
});

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
    state.selections = [];
    state.answered = false;
    renderQuestion();
  } else {
    renderResults();
  }
});
$('#review-btn').addEventListener('click', renderReview);
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
