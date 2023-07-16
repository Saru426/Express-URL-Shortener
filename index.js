const express = require('express');
const { nanoid } = require('nanoid');

const app = express();
app.use(express.json());

const urlMap = new Map();

app.post('/shorten', (req, res) => {
  const { url } = req.body;
  const shortId = nanoid(7); // Generate a random 7-character ID

  urlMap.set(shortId, url);

  const shortUrl = `http://yourdomain/${shortId}`;
  res.json({ shortUrl });
});

app.get('/:id', (req, res) => {
  const { id } = req.params;
  const url = urlMap.get(id);

  if (!url) {
    return res.status(404).json({ error: 'URL not found' });
  }

  res.redirect(url);
});

app.listen(3000, () => {
  console.log('URL shortener server is running on port 3000');
});
