# ⚡ sudo quiz --break-things

> A mildly hostile, terminal-aesthetic interactive quiz for ITP 141 systems administration topics across Modules 1 to 4.

---

## ✨ Features

* **5 Distinct Question Modes**: Test your knowledge across **Single Answer**, **Double Answer** (select exactly two), **True / False**, **Identification** (auto-capitalized text inputs), and **Interactive Sequence Ordering** (chronological step sorting with four or five steps).
* **Topic Selection**: Choose from Topic 6 (Dual-OS Part 1), Topic 7 (Dual-OS Part 2), Topic 8 (OS Maintenance), Topic 9 (Application Deployment), or Topic 12 (Security and Compliance).
* **Structured Sessions**: Each session contains 20 questions: 5 single-answer, 5 double-answer, 5 true/false, 3 identification, and 2 sequence questions. Topics 8, 9, and 12 contain 101-question banks.
* **Zero-Repetition Pool Tracker**: Questions are dynamically tracked using `localStorage`. Retaking the quiz pulls fresh questions until the entire module pool is exhausted.
* **Persistent State Management**: Page reloads will never wipe your progress. Your exact question index, score, selections, and current screen are saved automatically in real-time. Use **Home** to return to topic selection, then **Resume** to continue the active session.
* **Keyboard Submission**: Press **Enter** while answering an identification question to submit it.
* **Aggressive Automated Feedback**: Receive randomized sysadmin-style roasts or high-praise incident reports based on your performance.
* **Dual Theme Support**: Switch seamlessly between dark mode terminal vibes and clean light mode via the topbar theme toggle.

---

## 🛠️ Tech Stack

* **Markup & Structure**: HTML5 (`index.html`)
* **Styling & Layout**: Modern CSS3 Grid/Flexbox with CSS Custom Properties (`style.css`)
* **Logic & Persistence**: Vanilla JavaScript (`app.js`) utilizing `localStorage`

---

## 🚀 Quick Start / Local Installation

1. Clone or download this repository to your local machine.
2. Ensure all three core files are in the same directory:
   * `index.html`
   * `style.css`
   * `app.js`
3. Open `index.html` directly in any modern web browser, or serve it using a local development server (like VS Code's **Live Server** extension).

The application is a static HTML/CSS/JavaScript project and does not require a build step or package installation.

---

## 🕹️ How to Play

1. Select a topic from the boot sequence screen and click **RUN TOPIC**.
2. Answer each prompt carefully:
   * **Single Choice**: Pick one correct option.
   * **Double Choice**: Pick exactly two options.
   * **True / False**: Evaluate system behavior statements.
   * **Identification**: Type the correct technical command or term (automatically formatted to uppercase), then press **Enter** or click the submit button.
   * **Sequence**: Click available steps in the correct order to form a chronological execution path.
3. Click **Home** at any point to return to topic selection without discarding the active session. Click **Resume** to continue where you left off.
4. Lock in your choice to view immediate feedback and trivia facts.
5. Review your final incident report score breakdown, inspect answered questions, or retake the challenge with fresh module scenarios.

## 📁 Project Structure

* `index.html` - Main quiz page and topic controls.
* `app.js` - Quiz rendering, scoring, persistence, navigation, and theme behavior.
* `style.css` - Responsive layout and dark/light themes.
* `topics/` - Topic question banks loaded by the main page.
* `slides/` - Separate slide presentation app; it is not required to run the quiz.
