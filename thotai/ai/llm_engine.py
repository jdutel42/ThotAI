# Import necessary libraries
import os
import json
from datetime import date
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()  # charge la clé API depuis .env

# Initialisation du client OpenAI
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


def generate_cultural_pack(theme: str = "Découverte générale"):
    """
    Génère un pack culturel du jour à partir d'un thème donné.
    Utilise un modèle de langage (GPT-4 ou GPT-5) pour créer :
    - 3 faits
    - 1 anecdote
    - 1 question de quiz
    """

    prompt = f"""
    Tu es ThotAI, une intelligence artificielle de culture générale.
    Crée un "pack culturel du jour" au format JSON.
    Le pack doit contenir :
    - date (au format AAAA-MM-JJ)
    - theme (le thème demandé)
    - facts : une liste de 3 faits intéressants et précis sur ce thème
    - anecdote : une anecdote courte, marquante et véridique
    - quiz : une question simple avec 3 options et la bonne réponse

    Thème : {theme}

    Format JSON attendu :
    {{
        "date": "2025-10-16",
        "theme": "...",
        "facts": ["...", "...", "..."],
        "anecdote": "...",
        "quiz": {{
            "question": "...",
            "options": ["...", "...", "..."],
            "answer": "..."
        }}
    }}
    """

    # Appel du modèle OpenAI
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "Tu es une IA éducative spécialisée en culture générale."},
            {"role": "user", "content": prompt}
        ],
        temperature=0.8,
    )

    content = response.choices[0].message.content.strip()

    # Nettoyage et parsing
    try:
        data = json.loads(content)
    except json.JSONDecodeError:
        # Si le modèle a répondu avec du texte au lieu d’un JSON propre
        data = {
            "date": str(date.today()),
            "theme": theme,
            "facts": ["Erreur de parsing — reformule ton prompt."],
            "anecdote": "Impossible de générer l’anecdote.",
            "quiz": {
                "question": "Erreur",
                "options": ["", "", ""],
                "answer": ""
            }
        }

    return data
