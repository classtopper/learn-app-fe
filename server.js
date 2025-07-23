const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
require('dotenv').config(); // Load environment variables

// Check if we are in production or development
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// Prepare the Next.js app and create the HTTP server: NODE_ENV=production node server.js
app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(process.env.PORT || 3000, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${process.env.PORT || 3000}`);
  });
});
