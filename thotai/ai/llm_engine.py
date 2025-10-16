# Import necessary libraries
import os
import json
from datetime import date
from groq import Groq
from dotenv import load_dotenv

load_dotenv()  # Load environment variables from a .env file

# Initialize Groq client
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def generate_cultural_pack(theme: str = "Découverte générale"):
    """
    Génère un pack culturel via le modèle LLaMA3-70B de Groq.
    """
    prompt = f"""
    Tu es ThotAI, une IA de culture générale érudite et concise.
    Crée un "pack culturel du jour" au format JSON.
    Réponds UNIQUEMENT avec un objet JSON valide, sans texte avant ni après.

    Le pack doit contenir :
    - date (au format AAAA-MM-JJ)
    - theme
    - facts : une liste de 3 faits culturels intéressants et précis
    - anecdote : une anecdote courte, véridique et marquante
    - quiz : une question de culture avec 3 options et la bonne réponse

    Thème : {theme}

    Format JSON attendu :
    {{
        "date": "{date.today()}",
        "theme": "{theme}",
        "facts": ["...", "...", "..."],
        "anecdote": "...",
        "quiz": {{
            "question": "...",
            "options": ["...", "...", "..."],
            "answer": "..."
        }}
    }}
    """

    # ✅ Ici on envoie le vrai prompt
    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {"role": "system", "content": "Tu es ThotAI, une IA érudite et concise."},
            {"role": "user", "content": prompt}
        ]
    )

    content = response.choices[0].message.content.strip()
    # print("🧠 Réponse brute du modèle :", content)

    # ✅ Vérification JSON
    try:
        data = json.loads(content)
    except json.JSONDecodeError:
        data = {
            "date": str(date.today()),
            "theme": theme,
            "facts": ["Erreur : la sortie n’était pas du JSON valide."],
            "anecdote": "Erreur de génération.",
            "quiz": {
                "question": "Erreur",
                "options": ["", "", ""],
                "answer": ""
            }
        }

    return data
