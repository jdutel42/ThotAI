import { useState } from "react";

function App() {
  const [theme, setTheme] = useState("");
  const [pack, setPack] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generatePack = async () => {
    if (!theme.trim()) {
      setError("⚠️ Enter a theme!");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://127.0.0.1:8000/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ theme }),
      });

      if (!response.ok) throw new Error("Server error");

      const data = await response.json();
      setPack(data.pack);
    } catch {
      setError("❌ Unable to contact the API.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-600">🧠 ThotAI</h1>
        <p className="text-gray-700 mt-2">Daily Cultural Pack Generator</p>
      </header>

      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Ex: Renaissance, Egyptian Mythology..."
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          className="border border-gray-300 p-3 rounded-l-lg w-80 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={generatePack}
          className="bg-blue-500 text-white px-6 rounded-r-lg hover:bg-blue-600 transition-colors"
          disabled={loading}
        >
          {loading ? "⏳ Generating..." : "✨ Generate Pack"}
        </button>
      </div>

      {error && <p className="text-center text-red-500 mb-4">{error}</p>}

      {pack && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Facts card */}
          <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold mb-3">📚 Facts</h2>
            <ul className="list-disc list-inside space-y-1">
              {pack.facts.map((fact, idx) => (
                <li key={idx}>{fact}</li>
              ))}
            </ul>
          </div>

          {/* Anecdote card */}
          <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold mb-3">💡 Anecdote</h2>
            <p>{pack.anecdote}</p>
          </div>

          {/* Quiz card */}
          {pack.quiz && (
            <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition-shadow">
              <h2 className="text-xl font-semibold mb-3">❓ Quiz</h2>
              <p className="font-medium mb-2">{pack.quiz.question}</p>
              <ul className="list-disc list-inside space-y-1">
                {pack.quiz.options.map((option, idx) => (
                  <li key={idx}>{option}</li>
                ))}
              </ul>
              <p className="mt-2 text-green-600 font-semibold">
                Answer: {pack.quiz.answer}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
