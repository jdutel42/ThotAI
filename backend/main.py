from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import json
import os
from thotai.ai.llm_engine import generate_cultural_pack

# --------------------------
# Configuration API
# --------------------------

app = FastAPI(title="ThotAI", version="0.3")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend React
    allow_methods=["*"],                      # Autorise POST, GET, OPTIONS...
    allow_headers=["*"],
)

DATA_PATH = "backend/data/daily_pack.json"

# --------------------------
# Modèles Pydantic
# --------------------------

class ThemeRequest(BaseModel):
    theme: str

# --------------------------
# Endpoints
# --------------------------

@app.get("/")
async def root():
    return {"message": "ThotAI API is running. Use POST /generate to create a cultural pack."}

@app.get("/pack/today")
async def get_today_pack():
    """Return today's cultural pack."""
    if not os.path.exists(DATA_PATH):
        return {"error": "No pack has been generated yet."}
    with open(DATA_PATH, "r", encoding="utf-8") as f:
        return json.load(f)

@app.post("/generate")
async def generate_pack(request: ThemeRequest):
    """Generate a new cultural pack and save it."""
    pack = generate_cultural_pack(request.theme)

    # Créer le dossier si nécessaire
    os.makedirs(os.path.dirname(DATA_PATH), exist_ok=True)

    # Sauvegarder le pack
    with open(DATA_PATH, "w", encoding="utf-8") as f:
        json.dump(pack, f, indent=2, ensure_ascii=False)

    return {"message": "Cultural pack generated successfully.", "pack": pack}

# --------------------------
# Optionnel : CLI pour tests rapides
# --------------------------

def main():
    print("🧠 ThotAI – Générateur de pack culturel du jour")
    print("------------------------------------------------")
    theme = input("👉 Entrez un thème (ex: Mythologie égyptienne, Renaissance, Musique baroque) : ").strip()
    if not theme:
        theme = "Découverte générale"

    print(f"\n⏳ Génération du pack culturel sur le thème : {theme}...\n")
    pack = generate_cultural_pack(theme)
    print("✅ Pack généré avec succès :\n")
    print(json.dumps(pack, indent=2, ensure_ascii=False))

if __name__ == "__main__":
    main()
