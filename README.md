# 🧠 ThotAI

> **ThotAI** est une intelligence artificielle open-source dédiée à la **culture générale**.  
> Inspirée du dieu égyptien **Thot**, gardien du savoir et de l’écriture, ThotAI enseigne chaque jour de nouvelles connaissances, crée des fiches Anki et adapte les sujets à tes préférences.

---

## 🚀 Installation

```bash
git clone https://github.com/<ton_nom_utilisateur>/ThotAI.git
cd ThotAI
python -m venv .venv
source .venv/bin/activate  # ou .venv\Scripts\activate sous Windows
pip install -r requirements.txt
uvicorn thotai.main:app --reload
