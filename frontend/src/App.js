// import { useState } from "react";

// function App() {
//   const [theme, setTheme] = useState("");
//   const [pack, setPack] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const generatePack = async () => {
//     if (!theme.trim()) {
//       setError("⚠️ Enter a theme!");
//       return;
//     }

//     setLoading(true);
//     setError("");

//     try {
//       const response = await fetch("http://127.0.0.1:8000/generate", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ theme }),
//       });

//       if (!response.ok) throw new Error("Server error");

//       const data = await response.json();
//       setPack(data.pack);
//     } catch {
//       setError("❌ Unable to contact the API.");
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <header className="text-center mb-8">
//         <h1 className="text-4xl font-bold text-blue-600">🧠 ThotAI</h1>
//         <p className="text-gray-700 mt-2">Daily Cultural Pack Generator</p>
//       </header>

//       <div className="flex justify-center mb-6">
//         <input
//           type="text"
//           placeholder="Ex: Renaissance, Egyptian Mythology..."
//           value={theme}
//           onChange={(e) => setTheme(e.target.value)}
//           className="border border-gray-300 p-3 rounded-l-lg w-80 focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//         <button
//           onClick={generatePack}
//           className="bg-blue-500 text-white px-6 rounded-r-lg hover:bg-blue-600 transition-colors"
//           disabled={loading}
//         >
//           {loading ? "⏳ Generating..." : "✨ Generate Pack"}
//         </button>
//       </div>

//       {error && <p className="text-center text-red-500 mb-4">{error}</p>}

//       {pack && (
//         <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//           {/* Facts card */}
//           <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition-shadow">
//             <h2 className="text-xl font-semibold mb-3">📚 Facts</h2>
//             <ul className="list-disc list-inside space-y-1">
//               {pack.facts.map((fact, idx) => (
//                 <li key={idx}>{fact}</li>
//               ))}
//             </ul>
//           </div>

//           {/* Anecdote card */}
//           <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition-shadow">
//             <h2 className="text-xl font-semibold mb-3">💡 Anecdote</h2>
//             <p>{pack.anecdote}</p>
//           </div>

//           {/* Quiz card */}
//           {pack.quiz && (
//             <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition-shadow">
//               <h2 className="text-xl font-semibold mb-3">❓ Quiz</h2>
//               <p className="font-medium mb-2">{pack.quiz.question}</p>
//               <ul className="list-disc list-inside space-y-1">
//                 {pack.quiz.options.map((option, idx) => (
//                   <li key={idx}>{option}</li>
//                 ))}
//               </ul>
//               <p className="mt-2 text-green-600 font-semibold">
//                 Answer: {pack.quiz.answer}
//               </p>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;


import { useState, useEffect } from "react";

function App() {
  const [theme, setTheme] = useState("");
  const [pack, setPack] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [packsHistory, setPacksHistory] = useState([]);

  // Dark mode automatique basé sur le system
  const [darkMode, setDarkMode] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  
  useEffect(() => {
  const fetchHistory = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/history");
      const data = await res.json();
      setPacksHistory(data || []); // si undefined → on met []
    } catch (error) {
      console.error(error);
      setPacksHistory([]); // par sécurité
    }
  };

  fetchHistory();
}, []);


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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ theme }),
      });

      if (!response.ok) throw new Error("Erreur serveur");

      const data = await response.json();
      setPack(data.pack);
      setPacksHistory([data.pack, ...packsHistory]);
    } catch {
      setError("❌ Impossible de contacter l'API.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-500">
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-gray-800 dark:to-gray-700 text-white p-6 shadow-lg">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-wide">
            🧠 ThotAI
          </h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-lg shadow hover:scale-105 transition duration-200"
          >
            {darkMode ? "🌞 Light" : "🌙 Dark"}
          </button>
        </div>
      </header>

      {/* Formulaire génération */}
      <main className="p-6 flex flex-col items-center">
        <div className="w-full max-w-md flex flex-col gap-4 mb-10">
          <input
            type="text"
            placeholder="Ex : Renaissance, Mythologie Égyptienne..."
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="border p-3 rounded-lg focus:outline-none focus:ring-4 focus:ring-indigo-400 dark:bg-gray-800 dark:text-gray-200 transition duration-200"
          />
          <button
            onClick={generatePack}
            disabled={loading}
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-3 rounded-lg font-semibold shadow-lg transform hover:scale-105 transition duration-200"
          >
            {loading ? "⏳ Génération..." : "✨ Générer un Pack"}
          </button>
          {error && <p className="text-red-500 animate-pulse">{error}</p>}
        </div>

        {/* Grille interactive */}
        {packsHistory.length > 0 && (
          <section className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {packsHistory.map((p, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 transform hover:-translate-y-2 hover:scale-105 transition-all duration-300"
              >
                <h2 className="text-xl font-bold mb-1 dark:text-gray-200">📦 {p.theme}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Date : {p.date}</p>

                <div className="space-y-2">
                  {p.facts?.map((fact, i) => (
                    <p
                      key={i}
                      className="text-gray-700 dark:text-gray-300 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors duration-200"
                    >
                      • {fact}
                    </p>
                  ))}
                </div>

                {p.anecdote && (
                  <p className="mt-4 text-gray-800 dark:text-gray-200 italic bg-gray-50 dark:bg-gray-700 p-2 rounded">
                    💡 {p.anecdote}
                  </p>
                )}

                {/* {p.quiz && (
                  <div className="mt-4 p-3 bg-indigo-50 dark:bg-indigo-900 rounded transition-colors duration-200">
                    <p className="font-semibold dark:text-gray-200">❓ {p.quiz.question}</p>
                    <ul className="list-disc list-inside ml-2 dark:text-gray-300">
                      {p.quiz.options.map((opt, i) => (
                        <li key={i}>{opt}</li>
                      ))}
                    </ul>
                    <p className="mt-2 font-semibold text-green-600 dark:text-green-400">
                      ✅ Réponse : {p.quiz.answer}
                    </p>
                  </div>
                )} */}

                {p.quiz && (
                  <div className="mt-4 p-3 bg-indigo-50 dark:bg-indigo-900 rounded">
                    <p className="font-semibold dark:text-gray-200">❓ {p.quiz.question}</p>

                    <ul className="list-disc list-inside ml-2 dark:text-gray-300">
                      {p.quiz.options.map((opt, i) => (
                        <li key={i}>{opt}</li>
                      ))}
                    </ul>

                    <details className="mt-2 cursor-pointer">
                      <summary className="text-indigo-600 dark:text-indigo-400">👁️ Révéler la réponse</summary>
                      <p className="mt-2 font-semibold text-green-600 dark:text-green-400">
                        ✅ {p.quiz.answer}
                      </p>
                    </details>
                  </div>
                )}


                {p.anecdote && (
                  <button
                    onClick={() => navigator.clipboard.writeText(p.anecdote)}
                    className="mt-3 text-sm bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 px-3 py-1 rounded transition duration-200"
                  >
                    📋 Copier l'anecdote
                  </button>
                )}
              </div>
            ))}
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
