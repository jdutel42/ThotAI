from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import json
import os
from thotai.ai.llm_engine import generate_cultural_pack
from sqlalchemy.orm import Session
from .database import Base, engine, SessionLocal
from .models import Pack

# --------------------------
# Configuration API
# --------------------------

app = FastAPI(title="ThotAI", version="0.3")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Frontend React
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
# Base de données
# --------------------------

# Création des tables
Base.metadata.create_all(bind=engine)

# Dépendance DB
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

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
async def generate_pack(request: ThemeRequest, db: Session = Depends(get_db)):
    """Generate a new cultural pack and save it."""
    pack = generate_cultural_pack(request.theme)

    # Créer le dossier si nécessaire
    os.makedirs(os.path.dirname(DATA_PATH), exist_ok=True)

    # Sauvegarder le pack
    with open(DATA_PATH, "w", encoding="utf-8") as f:
        json.dump(pack, f, indent=2, ensure_ascii=False)


    # Sauvegarde BDD
    db_pack = Pack(theme=request.theme, data=json.dumps(pack, ensure_ascii=False))
    db.add(db_pack)
    db.commit()
    db.refresh(db_pack)

    return {"message": "Cultural pack generated and saved successfully.", "pack": pack}




@app.get("/history")
async def get_all_packs(db: Session = Depends(get_db)):
    packs = db.query(Pack).order_by(Pack.date.desc()).all()
    return [p.to_dict() for p in packs]



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
