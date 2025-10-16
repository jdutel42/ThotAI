# Import libraries
from fastapi import FastAPI # Ultra-light web framework for building APIs
from datetime import date # Module for manipulating dates
import json # Module for working with JSON data
import os # Module for interacting with the operating system

# http://127.0.0.1:8000/docs

############################################################




app = FastAPI(title="ThotAI", version="0.1") # API instance

DATA_PATH = "data/daily_pack.json" # Path to store daily cultural pack

# Endpoints

## Root endpoint
@app.get("/") # Root endpoint, returns a welcome message to verify the API is running
def root():
    return {"message": "Welcome to ThotAI — the AI for general culture."}

## Today's cultural pack endpoint
@app.get("/pack/today") # Endpoint to retrieve today's cultural pack stored in a JSON file
def get_today_pack():
    """Returns today's cultural pack."""
    if not os.path.exists(DATA_PATH): # If the file does not exist, return an error message
        return {"error": "No pack has been generated yet."}
    with open(DATA_PATH, "r", encoding="utf-8") as f: # Open the file and read its contents
        return json.load(f) # Return the contents of the file as a JSON response

## Generate cultural pack endpoint
@app.post("/pack/generate") # Endpoint to generate a new cultural pack (python dictionary) and save it to a JSON file
def generate_pack():
    """Generates a simple cultural pack."""
    pack = {
        "date": str(date.today()),
        "theme": "Random Discovery",
        "facts": [
            "The Great Wall of China is over 21,000 km long.",
            "The human brain contains about 86 billion neurons.",
            "Victor Hugo wrote 'Les Misérables' in exile in Guernsey."
        ],
        "anecdote": "The word 'poubelle' comes from the prefect Eugène Poubelle (1831–1907).",
        "quiz": {
            "question": "Which painter created 'The Starry Night'?",
            "options": ["Monet", "Van Gogh", "Manet"],
            "answer": "Van Gogh"
        }
    }

    os.makedirs("data", exist_ok=True) # Ensure the data directory exists
    with open(DATA_PATH, "w", encoding="utf-8") as f: # Write the pack to a JSON file
        json.dump(pack, f, indent=2, ensure_ascii=False) # Save the pack in a human-readable format

    return {"message": "Cultural pack generated successfully.", "pack": pack} # Return a success message along with the generated pack
