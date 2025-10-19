import { useState } from "react";

export default function ThemeForm({ onPackGenerated }) {
  const [theme, setTheme] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const response = await fetch("http://localhost:8000/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ theme }),
    });
    const data = await response.json();
    onPackGenerated(data);
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter a theme..."
        value={theme}
        onChange={(e) => setTheme(e.target.value)}
        style={{ width: 300, marginRight: 10 }}
      />
      <button type="submit" disabled={loading}>
        {loading ? "Generating..." : "Generate Pack"}
      </button>
    </form>
  );
}
