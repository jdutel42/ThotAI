import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());

app.post('/generate', (req, res) => {
  const { theme } = req.body;
  // Simule un "cultural pack" pour tester
  const pack = {
    theme,
    items: [
      { title: `${theme} – Item 1` },
      { title: `${theme} – Item 2` },
      { title: `${theme} – Item 3` }
    ]
  };
  res.json(pack);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
