# ⚡ sudo quiz --break-things

> A mildly hostile, terminal-aesthetic interactive quiz for ITP 141 (Module 1: Foundations, WSL 2, VirtualBox, and Post-Configuration).

---

## ✨ Features

* **5 Distinct Question Modes**: Test your knowledge across **Single Answer**, **Double Answer** (select exactly two), **True / False**, **Identification** (auto-capitalized text inputs), and **Interactive Sequence Ordering** (chronological step sorting).
* **Zero-Repetition Pool Tracker**: Questions are dynamically tracked using `localStorage`. Retaking the quiz pulls fresh questions until the entire module pool is exhausted.
* **Persistent State Management**: Page reloads will never wipe your progress. Your exact question index, score, selections, and current screen are saved automatically in real-time.
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

---

## 🕹️ How to Play

1. Click **RUN THE QUIZ** from the boot sequence screen.
2. Answer each prompt carefully:
   * **Single Choice**: Pick one correct option.
   * **Double Choice**: Pick exactly two options.
   * **True / False**: Evaluate system behavior statements.
   * **Identification**: Type the correct technical command or term (automatically formatted to uppercase).
   * **Sequence**: Click available steps in the correct order to form a 1-to-4 chronological execution path.
3. Lock in your choice to view immediate feedback and trivia facts.
4. Review your final incident report score breakdown, inspect answered questions, or retake the challenge with fresh module scenarios!
