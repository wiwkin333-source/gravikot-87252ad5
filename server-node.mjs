import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { join, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const clientDir = join(__dirname, 'dist/client');
const PORT = process.env.PORT || 80;

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.json': 'application/json',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
};

const server = createServer(async (req, res) => {
  let urlPath = req.url.split('?')[0];
  
  // Попробовать отдать файл
  const tryFile = async (filePath) => {
    try {
      const data = await readFile(filePath);
      const ext = extname(filePath);
      res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
      res.end(data);
      return true;
    } catch {
      return false;
    }
  };

  // 1. Точный путь
  if (await tryFile(join(clientDir, urlPath))) return;
  // 2. index.html в папке
  if (await tryFile(join(clientDir, urlPath, 'index.html'))) return;
  // 3. SPA fallback — index.html
  if (await tryFile(join(clientDir, 'index.html'))) return;

  res.writeHead(404);
  res.end('Not found');
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
