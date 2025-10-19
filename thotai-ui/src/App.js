import { useState } from "react";
import ThemeForm from "./components/ThemeForm";

function App() {
  const [pack, setPack] = useState(null);

  return (
    <div style={{ padding: 20 }}>
      <h1>🧠 ThotAI – Cultural Pack Generator</h1>
      <ThemeForm onPackGenerated={setPack} />
      {pack && (
        <pre style={{ marginTop: 20, background: "#f5f5f5", padding: 10 }}>
          {JSON.stringify(pack, null, 2)}
        </pre>
      )}
    </div>
  );
}

export default App;
