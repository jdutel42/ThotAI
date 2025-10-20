import subprocess
import os
import platform

# -------------------------
# Fonctions utilitaires
# -------------------------

def check_command(cmd, name):
    """Vérifie si la commande est disponible dans le PATH"""
    if shutil.which(cmd) is None:
        print(f"❌ {name} n'est pas installé ou non trouvé dans le PATH.")
        return False
    return True

def launch_in_terminal(command, title="App"):
    """Ouvre un terminal et lance la commande selon l'OS"""
    system = platform.system()
    if system == "Windows":
        subprocess.Popen(["start", "cmd", "/k", command], shell=True)
    elif system == "Darwin":  # macOS
        subprocess.Popen(["osascript", "-e",
            f'tell app "Terminal" to do script "{command}"'])
    else:  # Linux (gnome-terminal par défaut)
        subprocess.Popen(["gnome-terminal", "--", "bash", "-c", f'{command}; exec bash'])

# -------------------------
# Vérifications
# -------------------------

print("🔎 Vérification des dépendances...")

if not check_command("python", "Python"):
    sys.exit(1)
if not check_command("uvicorn", "Uvicorn"):
    print("⚠️ Uvicorn non trouvé. Assurez-vous que l'environnement virtuel est activé et uvicorn est installé.")
if not check_command("npm", "npm"):
    print("⚠️ npm non trouvé. Le frontend React ne pourra pas démarrer.")

# -------------------------
# Définir activation venv
# -------------------------

system = platform.system()
if system == "Windows":
    venv_activate = ".venv\\Scripts\\activate"
else:
    venv_activate = "source .venv/bin/activate"

# -------------------------
# Lancer Backend & Frontend
# -------------------------

# Backend
backend_command = f'{venv_activate} && uvicorn thotai.main:app --reload'
print("🚀 Démarrage du backend...")
subprocess.Popen(backend_command, shell=True)

# Frontend
frontend_command = "cd frontend && npm start"
print("🌐 Démarrage du frontend...")
subprocess.Popen(frontend_command, shell=True)

print("✅ ThotAI lancé ! Backend et Frontend sont en cours d'exécution.")
print("🔹 Backend : http://127.0.0.1:8000")
print("🔹 Frontend : http://localhost:3000")



