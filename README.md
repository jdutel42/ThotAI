# 🧠 ThotAI

> **ThotAI** is an open-source artificial intelligence dedicated to **general knowledge**.
> Inspired by the Egyptian god **Thoth**, guardian of knowledge and writing, ThotAI teaches new facts daily, creates Anki cards, and adapts topics to your preferences.

---

## 🚀 Installation

```bash
git clone https://github.com/<your_username>/ThotAI.git
cd ThotAI
python -m venv .venv
source .venv/bin/activate  # or .venv\Scripts\activate on Windows
pip install -r requirements.txt
```

---

## 🎯 Usage

### 1. Generate an interactive cultural pack

Run the main script and enter a theme in the terminal:

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

> The theme you enter will be used to generate the daily pack. If you leave it blank, the default theme `"General Discovery"` will be used.

---

### 2. (Optional) Run in server mode

If you want to use ThotAI via an API or web interface, start the Uvicorn server:

```bash
uvicorn thotai.main:app --reload
```

---

### 📂 Project Structure

```
ThotAI/
├── thotai/
│   ├── __init__.py
│   ├── main.py             # Interactive entry point
│   └── ai/
│       ├── __init__.py
│       └── llm_engine.py   # Cultural pack generation
├── .venv/                  # Virtual environment
├── requirements.txt
└── README.md
```