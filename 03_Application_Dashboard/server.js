const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.pdf': 'application/pdf',
  '.csv': 'text/csv; charset=utf-8'
};

const appDir = __dirname;
const rootDir = path.resolve(__dirname, '..');

const TRANSPARENT_ICON = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=', 'base64');

const server = http.createServer((req, res) => {
  let safePath = decodeURIComponent(req.url.split('?')[0]);
  if (safePath === '/favicon.ico') {
    res.writeHead(200, {
      'Content-Type': 'image/png',
      'Content-Length': TRANSPARENT_ICON.length,
      'Cache-Control': 'no-cache, no-store, must-revalidate'
    });
    res.end(TRANSPARENT_ICON);
    return;
  }
  if (safePath === '/' || safePath === '') safePath = '/index.html';

  // Liste des emplacements candidats de recherche
  const candidates = [
    path.join(appDir, safePath),
    path.join(rootDir, safePath),
    path.join(rootDir, safePath.replace(/^\//, '')),
    path.join(appDir, '02_Maquettes_et_Design', path.basename(safePath)),
    path.join(rootDir, '02_Maquettes_et_Design', path.basename(safePath))
  ];

  let targetPath = null;
  for (const candidate of candidates) {
    try {
      if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
        targetPath = candidate;
        break;
      }
    } catch (e) {
      // Ignorer les erreurs d'accès
    }
  }

  if (!targetPath) {
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(`
      <!DOCTYPE html>
      <html lang="fr">
      <head><meta charset="utf-8"><title>Page non trouvée</title>
      <style>body{font-family:sans-serif;background:#0f172a;color:#f8fafc;padding:40px;text-align:center;}a{color:#d97706;}</style>
      </head>
      <body>
        <h2>Fichier non trouvé (404)</h2>
        <p>Le chemin <code>${safePath}</code> est introuvable.</p>
        <p><a href="/">Retour au Tableau de Bord CIAT</a></p>
      </body>
      </html>
    `);
    return;
  }

  const ext = path.extname(targetPath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(targetPath, (err, content) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Erreur interne de lecture du fichier');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log(`Port ${PORT} déjà actif, l'application est accessible sur : http://localhost:${PORT}/`);
  } else {
    console.error('Erreur serveur:', err);
  }
});

server.listen(PORT, () => {
  console.log(`Serveur CIAT actif : http://localhost:${PORT}/`);
});
