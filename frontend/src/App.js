import { useState } from "react";

function App() {
  const [theme, setTheme] = useState("");      // Stocke le thème entré par l'utilisateur
  const [pack, setPack] = useState(null);      // Stocke le pack généré
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generatePack = async () => {
    if (!theme.trim()) {
      setError("⚠️ Tu dois entrer un thème !");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://127.0.0.1:8000/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ theme }),
      });

      if (!response.ok) throw new Error("Erreur serveur");

      const data = await response.json();
      setPack(data.pack);
    } catch (err) {
      setError("❌ Impossible de contacter l'API.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-10">
      <h1 className="text-3xl font-bold mb-6">🧠 ThotAI - Générateur de Culture</h1>

      <input
        type="text"
        placeholder="Ex : Renaissance, Mythologie Égyptienne..."
        value={theme}
        onChange={(e) => setTheme(e.target.value)}
        className="border p-2 rounded-lg w-80 mb-4"
      />

      <button
        onClick={generatePack}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
        disabled={loading}
      >
        {loading ? "⏳ Génération..." : "✨ Générer un Pack"}
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {pack && (
        <div className="mt-6 p-4 bg-white shadow rounded-lg w-3/4">
          <h2 className="text-xl font-semibold mb-2">📦 Pack généré :</h2>
          <pre className="text-sm bg-gray-100 p-4 rounded-lg overflow-auto">
            {JSON.stringify(pack, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

export default App;
