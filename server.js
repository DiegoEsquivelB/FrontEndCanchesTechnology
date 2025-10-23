const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from project root (index.html, app.js, style.css)
app.use(express.static(path.join(__dirname)));

// Endpoint that returns a small JS file injecting runtime env into the browser
// Usage: the frontend will fetch /config.js automatically (it's lightweight)
app.get('/config.js', (req, res) => {
  const config = {
    API_URL: process.env.API_URL || 'http://localhost:4000/api'
  };
  res.setHeader('Content-Type', 'application/javascript');
  res.send(`window.__ENV = ${JSON.stringify(config)};`);
});

// Fallback: serve index.html for SPA routes (optional)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Static frontend server listening on port ${PORT}`);
});
