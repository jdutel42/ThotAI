from fastapi import FastAPI
from datetime import date
import json
import os

# http://127.0.0.1:8000/docs

app = FastAPI(title="ThotAI", version="0.1")

DATA_PATH = "data/daily_pack.json"

@app.get("/")
def root():
    return {"message": "Bienvenue sur ThotAI — l'IA de la culture générale."}

@app.get("/pack/today")
def get_today_pack():
    """Renvoie le pack culturel du jour."""
    if not os.path.exists(DATA_PATH):
        return {"error": "Aucun pack n’a encore été généré."}
    with open(DATA_PATH, "r", encoding="utf-8") as f:
        return json.load(f)

@app.post("/pack/generate")
def generate_pack():
    """Génère un pack culturel simple."""
    pack = {
        "date": str(date.today()),
        "theme": "Découverte aléatoire",
        "facts": [
            "La Grande Muraille de Chine mesure plus de 21 000 km.",
            "Le cerveau humain contient environ 86 milliards de neurones.",
            "Victor Hugo a écrit 'Les Misérables' en exil à Guernesey."
        ],
        "anecdote": "Le mot 'poubelle' vient du préfet Eugène Poubelle (1831–1907).",
        "quiz": {
            "question": "Quel peintre a réalisé 'La Nuit étoilée' ?",
            "options": ["Monet", "Van Gogh", "Manet"],
            "answer": "Van Gogh"
        }
    }

    os.makedirs("data", exist_ok=True)
    with open(DATA_PATH, "w", encoding="utf-8") as f:
        json.dump(pack, f, indent=2, ensure_ascii=False)

    return {"message": "Pack culturel généré avec succès.", "pack": pack}
