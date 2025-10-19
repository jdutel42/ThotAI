# 🧠 ThotAI

> **ThotAI** is an open-source artificial intelligence dedicated to **general knowledge**.
> Inspired by the Egyptian god **Thoth**, guardian of knowledge and writing, ThotAI teaches new facts daily, creates Anki cards, and adapts topics to your preferences.

---

## 🚀 Installation

### 1. Clone the repository and set up Python backend

```bash
git clone https://github.com/jdutel42/ThotAI.git
cd ThotAI
python -m venv .venv
source .venv/bin/activate  # or .venv\Scripts\activate on Windows
pip install -r requirements.txt
```

### 2. Set up the React frontend

```bash
cd frontend
npm install
```

> Tailwind CSS is already configured in the frontend using Tailwind v4.

---

## 🎯 Usage

### 1. Run the interactive cultural pack (terminal)

```bash
python -m thotai.main
```

**Example interaction:**

```
🧠 ThotAI – Daily Cultural Pack Generator
------------------------------------------------
👉 Enter a theme (e.g., Egyptian Mythology, Renaissance, Baroque Music): Egyptian Mythology

⏳ Generating a cultural pack for the theme: Egyptian Mythology...

✅ Pack successfully generated:

{
  "date": "2025-10-16",
  "theme": "Egyptian Mythology",
  "facts": [
    "Ra, the Sun god, was reborn each morning as a scarab named Khepri.",
    "The Book of the Dead guided souls through the afterlife.",
    "The Nile was personified by the god Hapy."
  ],
  "anecdote": "The Rosetta Stone allowed Champollion to decipher hieroglyphs.",
  "quiz": {
    "question": "Which animal is associated with the god Anubis?",
    "options": ["Cat", "Jackal", "Falcon"],
    "answer": "Jackal"
  }
}
```

> Leaving the theme blank will use the default `"General Discovery"` theme.

---

### 2. Run the backend API server

```bash
uvicorn thotai.main:app --reload
```

The API endpoints:

| Endpoint      | Method | Description                                                             |
| ------------- | ------ | ----------------------------------------------------------------------- |
| `/`           | GET    | Check API status                                                        |
| `/pack/today` | GET    | Retrieve today's cultural pack                                          |
| `/generate`   | POST   | Generate a new cultural pack with JSON body `{ "theme": "Your Theme" }` |

---

### 3. Run the frontend web app

```bash
cd frontend
npm start
```

* Open your browser at `http://localhost:3000`
* Enter a theme → click “Generate Pack” → view the results returned from the backend.

> Frontend is built with **React** + **Tailwind CSS v4** for a modern responsive design.

---

### 📂 Project Structure

```
ThotAI/
├── backend/
│   ├── __init__.py
│   ├── main.py             # FastAPI backend
│   └── ai/
│       ├── __init__.py
│       └── llm_engine.py   # Cultural pack generation
├── frontend/
│   ├── package.json
│   ├── src/
│   │   ├── App.js          # React main page
│   │   ├── index.js        # React entry point
│   │   └── index.css       # Tailwind + global styles
├── .venv/                  # Python virtual environment
├── requirements.txt
└── README.md
```