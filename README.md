# ITP 141 Quiz

A browser-based knowledge check for **ITP 141: Systems Administration and Maintenance**. It uses topic-specific question banks, immediate feedback, review notes, and links to the related course slides.

## Features

- Five question modes: single answer, double answer, true/false, identification, and sequence ordering.
- Standard quiz: a 20-question session with 5 single, 5 double, 4 true/false, 5 identification, and 1 sequence question.
- Custom quiz: combine available topics and choose 10, 20, 30, 40, or 50 questions. The number of sequence questions increases with the selected length.
- Question history stored in `localStorage`, so retakes draw unused questions until a topic pool is exhausted.
- Saved in-progress sessions with a Resume control.
- Previous-question navigation that keeps submitted answers and feedback visible.
- Study facts after each answer. Supported topics open the course slides in a full-screen in-page viewer; Topic 1 shows its fact without a slide link because its module uses a different slide structure.
- Dark and light themes, responsive layout, keyboard support, and answer review at the end of a session.

## Running the quiz

This is a static project; no package installation or build step is required.

1. Open `index.html` in a modern browser, or serve the folder with a static server such as VS Code Live Server.
2. Enter the short display name and phone number requested by the interface.
3. Choose Standard or Custom mode.
4. Select a topic or topics, then start the quiz.

For a Standard quiz, double-clicking a topic starts it immediately.

## Question banks

Question data is maintained manually in individual topic files. `index.html` loads each available bank before `app.js`.

```text
topics/
|- module1/topic1.js, topic2.js, topic3.js, topic6.js, topic7.js
|- module2/topic8.js
|- module3/topic9.js
|- module4/topic10.js through topic12.js
|- module5/topic13.js through topic14.js
`- module6/topic15.js through topic16.js
```

Every bank registers itself on `window.quizTopics` using this shape:

```js
window.quizTopics.topicX = {
  id: 'topicX',
  label: 'Topic X',
  title: 'Topic title',
  description: 'Short summary',
  questions: {
    single: [],
    double: [],
    tf: [],
    identification: [],
    sequence: []
  }
};
```

A topic needs at least 5 single-answer, 5 double-answer, 4 true/false, 5 identification, and 1 sequence question to run a Standard quiz. When adding a topic file, also add its script tag and selector entry in `index.html`.

## Project structure

- `index.html` - application structure, topic selector, and slide-viewer overlay.
- `style.css` - responsive styling and dark/light theme tokens.
- `app.js` - quiz sessions, question selection, scoring, persistence, navigation, and slide viewer behavior.
- `topics/` - manually authored topic question banks.
- `modules/` - course-module slide data used by the separate course presentation project.

## Notes

- Browser storage keeps your name, theme, used-question history, and active session. Clear site data to reset everything.
- The embedded slide viewer loads `https://anjelic03.github.io/ITP141-Modules/`; internet access is required for those slide links.
