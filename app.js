const questionPools = {
  single: [
    { topic: 'FOUNDATIONS', text: 'Which directory is the usual first suspect when a service has a broken configuration?', options: ['/home', '/etc', '/usr', '/opt'], answer: [1], fact: '/etc stores system configuration files.' },
    { topic: 'FOUNDATIONS', text: 'Which command reports the current working directory?', options: ['pwd', 'whereami', 'cd --show', 'locate'], answer: [0], fact: 'pwd prints the present working directory.' },
    { topic: 'FOUNDATIONS', text: 'What is Linux, technically speaking?', options: ['A desktop environment', 'A package manager', 'A kernel', 'A filesystem standard'], answer: [2], fact: 'Linux is the kernel; a distribution packages it with userland and support.' },
    { topic: 'FOUNDATIONS', text: 'Which administration style is easiest to repeat across many servers?', options: ['GUI clicking', 'CLI scripting', 'Guessing', 'Reinstalling everything'], answer: [1], fact: 'CLI procedures can be scripted, repeated, and audited.' },
    { topic: 'FOUNDATIONS', text: 'Which command is used to inspect running processes?', options: ['ps', 'df', 'grep', 'mountain'], answer: [0], fact: 'ps displays a snapshot of active processes.' },
    { topic: 'FOUNDATIONS', text: 'Which Linux directory is conventionally used for ordinary users’ home folders?', options: ['/var', '/rootfs', '/home', '/userspace'], answer: [2], fact: 'Ordinary user data lives under /home.' },
    { topic: 'FOUNDATIONS', text: 'Which utility changes file permissions?', options: ['chown', 'chmod', 'chgrp', 'permit'], answer: [1], fact: 'chmod modifies read, write, and execute permission bits.' },
    { topic: 'TEXT PROCESSING', text: 'Which grep option enables extended regular expressions?', options: ['-x', '-E', '-r', '-F'], answer: [1], fact: 'grep -E enables extended regular expression syntax.' },
    { topic: 'TEXT PROCESSING', text: 'Which sed flag replaces every match on a line?', options: ['i', 'p', 'g', 'all'], answer: [2], fact: 'The g flag makes a substitution global across each selected line.' },
    { topic: 'TEXT PROCESSING', text: 'What does awk treat each input line as?', options: ['A record split into fields', 'A binary object', 'A process', 'A shell function'], answer: [0], fact: 'awk reads records and splits them into fields.' },
    { topic: 'TEXT PROCESSING', text: 'Which awk variable stores the number of fields in the current record?', options: ['$0', 'NR', 'NF', 'FS'], answer: [2], fact: 'NF is the number of fields in the current record.' },
    { topic: 'TEXT PROCESSING', text: 'Which tool is the most direct choice when you need to find matching lines?', options: ['grep', 'sed', 'awk', 'tar'], answer: [0], fact: 'grep is designed to select matching lines.' },
    { topic: 'TEXT PROCESSING', text: 'Which awk block runs once before input is processed?', options: ['START', 'BEGIN', 'PRE', 'INIT'], answer: [1], fact: 'BEGIN runs once before the first record.' },
    { topic: 'BASH', text: 'What does the shebang line tell the system?', options: ['Who wrote the script', 'Which interpreter to use', 'How fast to run it', 'Where logs are stored'], answer: [1], fact: '#!/usr/bin/env bash selects the Bash interpreter.' },
    { topic: 'BASH', text: 'Which command grants a script execute permission?', options: ['run +x script.sh', 'chmod +x script.sh', 'bash --enable script.sh', 'sudo execute script.sh'], answer: [1], fact: 'chmod +x adds the execute bit.' },
    { topic: 'BASH', text: 'Which Bash construct captures command output into a variable?', options: ['$(...)', '${...}', '<<...>>', '%%...%%'], answer: [0], fact: 'Command substitution uses $(command).' },
    { topic: 'BASH', text: 'Which test operator checks whether a path is a directory?', options: ['-f', '-d', '-x', '-z'], answer: [1], fact: 'The -d test succeeds for a directory.' },
    { topic: 'BASH', text: 'Which scheduler reads crontab entries?', options: ['cron', 'rsyncd', 'systemgrep', 'loopd'], answer: [0], fact: 'cron runs scheduled commands described by crontab.' },
    { topic: 'BASH', text: 'What does a Bash function return by default?', options: ['A JSON object', 'An exit status', 'A disk image', 'Nothing at all'], answer: [1], fact: 'Bash functions return an exit status; data is commonly echoed.' },
    { topic: 'BASH', text: 'Which option makes a Bash script fail when an unset variable is used?', options: ['-e', '-u', '-o pipefail', '-v'], answer: [1], fact: 'set -u treats unset variables as errors.' },
    { topic: 'VIRTUALIZATION', text: 'Which WSL version runs a real Linux kernel?', options: ['WSL 0', 'WSL 1', 'WSL 2', 'WSL Pro'], answer: [2], fact: 'WSL 2 runs a real Linux kernel inside a lightweight utility VM.' },
    { topic: 'VIRTUALIZATION', text: 'Which command verifies a WSL distribution is using version 2?', options: ['wsl -l -v', 'wsl --is-real', 'wsl --check-kernel', 'wsl -version 2'], answer: [0], fact: 'wsl -l -v lists distributions and their WSL version.' },
    { topic: 'VIRTUALIZATION', text: 'Which VirtualBox mode puts a guest on the physical LAN as a peer?', options: ['NAT', 'Internal', 'Bridged', 'Loopback'], answer: [2], fact: 'Bridged mode gives the guest its own presence on the physical network.' },
    { topic: 'VIRTUALIZATION', text: 'Which Windows Server installation has no full graphical shell?', options: ['Desktop Experience', 'Server Core', 'Server Lite GUI', 'Recovery Mode'], answer: [1], fact: 'Server Core is the minimal, no-full-desktop installation.' },
    { topic: 'VIRTUALIZATION', text: 'Which component provides Active Directory, DNS, and DHCP management consoles?', options: ['RSAT', 'WSL', 'LVM', 'Netplan'], answer: [0], fact: 'RSAT supplies Remote Server Administration Tools.' },
    { topic: 'UBUNTU', text: 'Which file format is used by Netplan?', options: ['INI', 'YAML', 'TOML', 'XML'], answer: [1], fact: 'Netplan configuration is YAML, so indentation matters.' },
    { topic: 'UBUNTU', text: 'Which Ubuntu utility changes the system hostname?', options: ['hostnamectl', 'namechange', 'hostedit', 'systemname'], answer: [0], fact: 'hostnamectl sets and displays the hostname.' },
    { topic: 'UBUNTU', text: 'Which service provides secure remote shell access?', options: ['FTP', 'OpenSSH', 'Telnet+', 'Remote Bash'], answer: [1], fact: 'OpenSSH provides secure remote shell access, normally on TCP 22.' },
    { topic: 'UBUNTU', text: 'Which timezone is specified in the module’s Ubuntu post-configuration?', options: ['UTC/Manila', 'Asia/Manila', 'PST/Davao', 'Philippines/Time'], answer: [1], fact: 'The module uses timedatectl set-timezone Asia/Manila.' }
  ],
  double: [
    { topic: 'FOUNDATIONS', text: 'Which TWO are core reasons to use the CLI in production?', options: ['Repeatability', 'It needs more mouse', 'Auditability', 'It makes monitors brighter'], answer: [0, 2], fact: 'CLI work is repeatable and leaves an auditable procedure.' },
    { topic: 'FOUNDATIONS', text: 'Which TWO belong to the common Linux filesystem hierarchy discussed in the module?', options: ['/etc', '/games', '/var', '/maybe'], answer: [0, 2], fact: '/etc holds configuration and /var holds growing operational data and logs.' },
    { topic: 'FOUNDATIONS', text: 'Which TWO are Linux account-management commands?', options: ['usermod', 'groupadd', 'diskwizard', 'processkill'], answer: [0, 1], fact: 'usermod changes user accounts and groupadd creates groups.' },
    { topic: 'FOUNDATIONS', text: 'Which TWO are in the storage, search, and archiving group?', options: ['df', 'du', 'ssh', 'passwd'], answer: [0, 1], fact: 'df reports filesystem space and du estimates file or directory usage.' },
    { topic: 'TEXT PROCESSING', text: 'Which TWO grep options provide context around a match?', options: ['-A', '-B', '-z', '-q'], answer: [0, 1], fact: '-A prints after-context and -B prints before-context.' },
    { topic: 'TEXT PROCESSING', text: 'Which TWO are awk automatic variables or separators?', options: ['NR', 'NF', 'NICE', 'LINECOUNT'], answer: [0, 1], fact: 'NR is the record number and NF is the field count.' },
    { topic: 'TEXT PROCESSING', text: 'Which TWO are regular-expression building blocks?', options: ['Character classes', 'Quantifiers', 'File permissions', 'Virtual disks'], answer: [0, 1], fact: 'Classes select characters and quantifiers control repetition.' },
    { topic: 'BASH', text: 'Which TWO are part of Bash strict mode?', options: ['set -e', 'set -u', 'set -loud', 'set --nice'], answer: [0, 1], fact: 'set -e stops on errors and set -u rejects unset variables; pipefail is commonly added.' },
    { topic: 'BASH', text: 'Which TWO are sensible unattended-script safeguards?', options: ['trap', 'Logging', 'Ignoring exit codes', 'Deleting all backups'], answer: [0, 1], fact: 'trap and logging expose failures that would otherwise be silent.' },
    { topic: 'BASH', text: 'Which TWO are Bash parameter-expansion examples from the module?', options: ['${file%.tgz}', '${file#portal-}', '$(rm -rf)', 'chmod ${brain}'], answer: [0, 1], fact: 'Parameter expansion can trim suffixes and prefixes without an external command.' },
    { topic: 'VIRTUALIZATION', text: 'Which TWO statements describe WSL 2?', options: ['It uses a real Linux kernel', 'It has no native VM snapshot facility', 'It is a Type-2 VirtualBox guest', 'It gives every distro a physical NIC'], answer: [0, 1], fact: 'WSL 2 has a real kernel, but export is the practical snapshot substitute.' },
    { topic: 'VIRTUALIZATION', text: 'Which TWO are VirtualBox network modes in the module?', options: ['NAT', 'Bridged', 'Teleport', 'Direct Ethernet Magic'], answer: [0, 1], fact: 'NAT and Bridged are two of the compared adapter modes.' },
    { topic: 'VIRTUALIZATION', text: 'Which TWO settings are recommended for the Windows Server 2022 VM?', options: ['4 GB memory', '60 GB disk', '256 MB memory', '3 TB floppy'], answer: [0, 1], fact: 'The module suggests 4 GB RAM and a 60 GB dynamically allocated disk.' },
    { topic: 'UBUNTU', text: 'Which TWO Ubuntu post-configuration tasks are required?', options: ['Set the timezone', 'Enable OpenSSH', 'Disable all updates', 'Rename /etc to /confused'], answer: [0, 1], fact: 'The workflow sets Asia/Manila and enables/starts OpenSSH.' },
    { topic: 'UBUNTU', text: 'Which TWO details matter in a Netplan file?', options: ['YAML indentation', 'Routes instead of deprecated gateway4 guidance', 'Semicolons at every line', 'Tabs for alignment'], answer: [0, 1], fact: 'Netplan is indentation-sensitive YAML and current routes syntax replaces gateway4 guidance.' },
    { topic: 'UBUNTU', text: 'Which TWO tests close the dual-OS exercise?', options: ['Ping between guests', 'SSH to Ubuntu', 'Open Solitaire on Windows', 'Ask DNS politely'], answer: [0, 1], fact: 'Lab 1C requires bidirectional ping and SSH evidence.' }
  ],
  tf: [
    { topic: 'FOUNDATIONS', text: 'Linux is a complete distribution that includes the kernel, installer, and package manager.', options: ['TRUE', 'FALSE'], answer: [1], fact: 'Linux itself is the kernel; a distribution bundles the surrounding tools.' },
    { topic: 'FOUNDATIONS', text: 'Configuration drift means machines intended to match gradually become different.', options: ['TRUE', 'FALSE'], answer: [0], fact: 'Configuration drift is divergence between supposedly identical systems.' },
    { topic: 'FOUNDATIONS', text: 'The output of one Unix-style utility can be fed into another with a pipe.', options: ['TRUE', 'FALSE'], answer: [0], fact: 'The pipe operator composes small utilities into a larger workflow.' },
    { topic: 'TEXT PROCESSING', text: 'sed -i.bak edits a file in place while keeping a backup copy.', options: ['TRUE', 'FALSE'], answer: [0], fact: '-i.bak preserves the original alongside the in-place edit.' },
    { topic: 'TEXT PROCESSING', text: 'awk is the best choice when a task requires arithmetic across fields.', options: ['TRUE', 'FALSE'], answer: [0], fact: 'awk naturally handles fields, computation, arrays, and formatted output.' },
    { topic: 'TEXT PROCESSING', text: 'grep -v prints only the lines that match the pattern.', options: ['TRUE', 'FALSE'], answer: [1], fact: 'grep -v inverts the match and prints lines that do not match.' },
    { topic: 'BASH', text: 'An unquoted filename variable is safe even when the filename contains spaces.', options: ['TRUE', 'FALSE'], answer: [1], fact: 'Variables should be quoted so spaces do not split one path into multiple arguments.' },
    { topic: 'BASH', text: 'cron uses five time fields before the command.', options: ['TRUE', 'FALSE'], answer: [0], fact: 'The fields are minute, hour, day of month, month, and day of week.' },
    { topic: 'BASH', text: 'A Bash function returns ordinary data with the return keyword.', options: ['TRUE', 'FALSE'], answer: [1], fact: 'return sets an exit status; echo plus command substitution carries data.' },
    { topic: 'BASH', text: 'An exit code of zero normally means success.', options: ['TRUE', 'FALSE'], answer: [0], fact: 'Shell convention uses zero for success and nonzero for failure.' },
    { topic: 'VIRTUALIZATION', text: 'WSL 1 translated Linux system calls instead of running a Linux kernel.', options: ['TRUE', 'FALSE'], answer: [0], fact: 'WSL 1 used a translation layer; WSL 2 uses a real kernel.' },
    { topic: 'VIRTUALIZATION', text: 'NAT lets a guest accept new inbound sessions from any other machine by default.', options: ['TRUE', 'FALSE'], answer: [1], fact: 'NAT generally provides outbound access while refusing unsolicited inbound sessions.' },
    { topic: 'VIRTUALIZATION', text: 'A Type-2 hypervisor runs as an application on a host operating system.', options: ['TRUE', 'FALSE'], answer: [0], fact: 'VirtualBox is a Type-2 hypervisor.' },
    { topic: 'UBUNTU', text: 'Netplan rejects tab characters because YAML indentation is significant.', options: ['TRUE', 'FALSE'], answer: [0], fact: 'Netplan uses YAML; whitespace and indentation are syntax.' },
    { topic: 'UBUNTU', text: 'NAT is enough when two VirtualBox guests must directly reach each other for Lab 1C.', options: ['TRUE', 'FALSE'], answer: [1], fact: 'Lab 1C needs Bridged networking so both guests are peers on one subnet.' },
    { topic: 'UBUNTU', text: 'OpenSSH normally listens on TCP port 22.', options: ['TRUE', 'FALSE'], answer: [0], fact: 'SSH uses TCP 22 by default.' }
  ],
  identification: [
    { topic: 'FOUNDATIONS', text: 'Identify the standard interface that Unix and Linux systems commonly honor.', answer: ['POSIX'], fact: 'POSIX is the standardized interface shared by Unix-like systems.' },
    { topic: 'FOUNDATIONS', text: 'What is the name for the convention that defines the meaning of directories such as /etc and /var?', answer: ['FILESYSTEM HIERARCHY STANDARD', 'FHS'], fact: 'The Filesystem Hierarchy Standard gives common directories consistent meanings.' },
    { topic: 'TEXT PROCESSING', text: 'Name the utility that reads records, splits fields, computes values, and formats reports.', answer: ['AWK'], fact: 'awk is the field-oriented reporting tool in Module 1.' },
    { topic: 'TEXT PROCESSING', text: 'What is the name of the notation used to describe the shape of text?', answer: ['REGULAR EXPRESSION', 'REGEX', 'REGEXP'], fact: 'A regular expression describes a pattern rather than one literal string.' },
    { topic: 'TEXT PROCESSING', text: 'Identify the sed operation that replaces old text with new text.', answer: ['SUBSTITUTION', 'S'], fact: 'sed substitution uses the s/old/new/ command.' },
    { topic: 'BASH', text: 'What is the first interpreter-declaring line of a runnable script called?', answer: ['SHEBANG', 'SHEBANG LINE'], fact: 'The shebang selects the interpreter, such as Bash.' },
    { topic: 'BASH', text: 'Name the Linux scheduler used with crontab.', answer: ['CRON'], fact: 'cron runs commands according to crontab schedules.' },
    { topic: 'BASH', text: 'What Bash builtin registers a command to run on ERR or EXIT?', answer: ['TRAP'], fact: 'trap handles signals and shell events such as ERR and EXIT.' },
    { topic: 'BASH', text: 'Name the command used to copy changed files efficiently to a destination tree.', answer: ['RSYNC'], fact: 'rsync transfers only the changes needed to synchronize trees.' },
    { topic: 'VIRTUALIZATION', text: 'What WSL release runs a real Linux kernel in a lightweight utility VM?', answer: ['WSL 2', 'WSL2'], fact: 'WSL 2 uses a real Linux kernel managed through Hyper-V architecture.' },
    { topic: 'VIRTUALIZATION', text: 'Name the VirtualBox adapter mode required for the two guests to appear as peers on the LAN.', answer: ['BRIDGED', 'BRIDGED ADAPTER', 'BRIDGED MODE'], fact: 'Bridged networking puts each guest directly on the physical LAN.' },
    { topic: 'VIRTUALIZATION', text: 'What is the name of Microsoft’s remote administration console/tool collection installed on Windows Server?', answer: ['RSAT', 'REMOTE SERVER ADMINISTRATION TOOLS'], fact: 'RSAT supplies the administrative consoles.' },
    { topic: 'UBUNTU', text: 'Identify the YAML-based Ubuntu network configuration system.', answer: ['NETPLAN'], fact: 'Netplan manages Ubuntu Server network configuration.' },
    { topic: 'UBUNTU', text: 'What secure remote shell service should be enabled on the Ubuntu guest?', answer: ['OPENSSH', 'SSH'], fact: 'OpenSSH provides secure remote shell access.' },
    { topic: 'UBUNTU', text: 'Name the Linux storage abstraction that lets volumes grow and disks join a storage pool.', answer: ['LVM', 'LOGICAL VOLUME MANAGEMENT'], fact: 'LVM adds flexible logical volumes above physical storage.' },
    { topic: 'UBUNTU', text: 'What command safely tests a Netplan change and can revert if SSH is cut off?', answer: ['NETPLAN TRY'], fact: 'netplan try provides an automatic rollback window.' }
  ]
};

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

const state = {
  questions: [],
  index: 0,
  score: 0,
  selections: [],
  answered: false,
  byMode: { single: 0, double: 0, tf: 0, identification: 0 },
  review: [],
  boots: Number(localStorage.getItem('itpQuizBoots') || 7)
};

const $ = (selector) => document.querySelector(selector);
const screens = { start: $('#start-screen'), question: $('#question-screen'), results: $('#results-screen') };

function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function buildSession() {
  const modes = ['single', 'double', 'tf', 'identification'];
  state.questions = modes.flatMap((mode) => shuffle(questionPools[mode]).slice(0, 5).map((question) => ({ ...question, mode })));
  state.questions = shuffle(state.questions);
  state.index = 0;
  state.score = 0;
  state.selections = [];
  state.answered = false;
  state.byMode = { single: 0, double: 0, tf: 0, identification: 0 };
  state.review = [];
  state.boots += 1;
  localStorage.setItem('itpQuizBoots', String(state.boots));
  $('#boot-count').textContent = String(state.boots).padStart(4, '0');
}

function showScreen(name) {
  Object.values(screens).forEach((screen) => screen.classList.add('hidden'));
  screens[name].classList.remove('hidden');
}

function modeName(mode) {
  return { single: 'SINGLE ANSWER', double: 'DOUBLE ANSWER', tf: 'TRUE / FALSE', identification: 'IDENTIFICATION' }[mode];
}

function renderQuestion() {
  const question = state.questions[state.index];
  state.selections = [];
  state.answered = false;
  const questionNumber = String(state.index + 1).padStart(2, '0');
  $('#question-number').textContent = questionNumber;
  $('#question-count').textContent = `${questionNumber} / 20`;
  $('#mode-label').textContent = modeName(question.mode);
  $('#topic-label').textContent = question.topic;
  $('#question-text').textContent = question.text;
  $('#question-hint').textContent = question.mode === 'single' ? 'SELECT ONE' : question.mode === 'double' ? 'SELECT EXACTLY TWO' : question.mode === 'tf' ? 'SELECT TRUE OR FALSE' : 'TYPE THE TERM';
  $('#progress-bar').style.width = `${((state.index + 1) / state.questions.length) * 100}%`;
  $('#live-score').textContent = String(state.score).padStart(2, '0');
  $('#selection-note').textContent = question.mode === 'double' ? 'Two answers. Not one. Not three. Two.' : 'Choose the answer that will keep the server alive.';
  $('#next-label').textContent = state.index === 19 ? 'END THE CHAOS' : 'LOCK IT IN';
  $('#next-btn').disabled = true;
  $('#answers').innerHTML = '';
  $('#answers').classList.toggle('hidden', question.mode === 'identification');
  $('#text-answer-wrap').classList.toggle('hidden', question.mode !== 'identification');
  $('#text-answer').value = '';
  $('#text-answer').disabled = false;
  $('#selection-note').style.color = 'var(--ink-soft)';

  if (question.mode !== 'identification') {
    question.options.forEach((option, optionIndex) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'answer-btn';
      button.dataset.index = String(optionIndex);
      button.innerHTML = `<span class="answer-letter">${String.fromCharCode(65 + optionIndex)}</span><span class="answer-copy"></span>`;
      button.querySelector('.answer-copy').textContent = option;
      button.addEventListener('click', () => selectOption(optionIndex));
      $('#answers').appendChild(button);
    });
  }
  showScreen('question');
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
  document.querySelectorAll('.answer-btn').forEach((button) => button.classList.toggle('selected', state.selections.includes(Number(button.dataset.index))));
  $('#next-btn').disabled = state.selections.length !== (question.mode === 'double' ? 2 : 1);
}

function normalized(value) {
  return value.trim().replace(/\s+/g, ' ').toUpperCase();
}

function checkAnswer() {
  const question = state.questions[state.index];
  let correct = false;
  let submitted = '';
  if (question.mode === 'identification') {
    submitted = normalized($('#text-answer').value);
    correct = question.answer.map(normalized).includes(submitted);
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
  $('#selection-note').textContent = correct ? 'CORRECT. The server remains upright. For now.' : roastLines[Math.floor(Math.random() * roastLines.length)];
  $('#selection-note').style.color = correct ? '#2e8d4b' : 'var(--coral)';
  if (question.mode !== 'identification') {
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
  $('#next-label').textContent = state.index === 19 ? 'VIEW REPORT' : 'NEXT QUESTION';
}

function renderResults() {
  showScreen('results');
  const percentage = state.score / 20;
  $('#final-score').textContent = String(state.score).padStart(2, '0');
  const titles = percentage >= .9 ? ['Disturbingly competent.', 'The server fears you now.'] : percentage >= .7 ? ['Mostly operational.', 'A few processes escaped.'] : percentage >= .5 ? ['Technically alive.', 'Please do not touch production.'] : ['Critical failure.', 'The logs have been notified.'];
  $('#result-title').textContent = titles[Math.floor(Math.random() * titles.length)];
  const resultModes = { single: 'single', double: 'double', tf: 'tf', identification: 'id' };
  Object.entries(resultModes).forEach(([mode, id]) => {
    const value = state.byMode[mode];
    $(`#${id}-result`).textContent = `${value}/5`;
    $(`#${id}-meter`).style.width = `${value * 20}%`;
  });
  $('#roast-text').textContent = state.score === 20 ? 'You got everything right. Suspicious. Check your keyboard for an answer key.' : state.score >= 15 ? 'Not bad. Your services may survive a weekend, provided nobody opens a terminal.' : state.score >= 10 ? roastLines[Math.floor(Math.random() * roastLines.length)] : 'Your quiz instance has entered a low-availability state. Study the module, then come back louder.';
  $('#review-list').classList.add('hidden');
}

function renderReview() {
  const list = $('#review-list');
  list.innerHTML = state.review.map((item, index) => {
    const answer = item.question.mode === 'identification' ? item.question.answer[0] : item.question.answer.map((answerIndex) => item.question.options[answerIndex]).join(', ');
    return `<div class="review-item ${item.correct ? 'correct' : 'wrong'}"><strong>${String(index + 1).padStart(2, '0')}</strong><div><p>${item.question.text}</p><small>${item.correct ? 'CORRECT' : `YOU: ${item.submitted || 'NO ANSWER'} // CORRECT: ${answer}`}</small></div></div>`;
  }).join('');
  list.classList.toggle('hidden');
  $('#review-btn').innerHTML = list.classList.contains('hidden') ? 'VIEW ANSWERS <span>↓</span>' : 'HIDE ANSWERS <span>↑</span>';
}

const themeToggleBtn = $('#theme-toggle');
const savedTheme = localStorage.getItem('itpQuizTheme');

if (savedTheme === 'light') {
  document.documentElement.setAttribute('data-theme', 'light');
}

function updateThemeIcon() {
  const isLight = document.documentElement.getAttribute('data-theme') === 'light';
  themeToggleBtn.textContent = isLight ? '🌙' : '☀️';
}
updateThemeIcon();

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

$('#start-btn').addEventListener('click', () => { buildSession(); renderQuestion(); });
$('#retake-btn').addEventListener('click', () => { buildSession(); renderQuestion(); window.scrollTo({ top: $('#quiz-app').offsetTop - 25, behavior: 'smooth' }); });
$('#next-btn').addEventListener('click', () => { if (!state.answered) checkAnswer(); else if (state.index < 19) { state.index += 1; renderQuestion(); } else renderResults(); });
$('#review-btn').addEventListener('click', renderReview);
$('#text-answer').addEventListener('input', (event) => { event.target.value = event.target.value.toUpperCase(); $('#next-btn').disabled = event.target.value.trim().length === 0 || state.answered; });
$('#boot-count').textContent = String(state.boots).padStart(4, '0');
