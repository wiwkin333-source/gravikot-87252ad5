import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { join, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const clientDir = join(__dirname, 'dist/client');
const PORT = process.env.PORT || 80;

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript',
  '.mjs': 'application/javascript',
  '.css': 'text/css',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.json': 'application/json',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
};

// Загружаем SSR модуль
let ssrHandler = null;
async function getSsrHandler() {
  if (ssrHandler) return ssrHandler;
  try {
    const mod = await import('./dist/server/index.js');
    ssrHandler = mod.default;
    console.log('SSR handler loaded');
  } catch(e) {
    console.error('SSR load error:', e.message);
  }
  return ssrHandler;
}

const server = createServer(async (req, res) => {
  const urlPath = req.url.split('?')[0];

  // Статические файлы из dist/client
  const staticPath = join(clientDir, urlPath);
  try {
    const s = await stat(staticPath);
    if (s.isFile()) {
      const data = await readFile(staticPath);
      const ext = extname(staticPath);
      res.writeHead(200, { 
        'Content-Type': mimeTypes[ext] || 'application/octet-stream',
        'Cache-Control': ext === '.html' ? 'no-cache' : 'public, max-age=31536000'
      });
      res.end(data);
      return;
    }
  } catch {}

  // SSR — передаём запрос в TanStack Start server
  const handler = await getSsrHandler();
  if (handler) {
    try {
      const url = `http://localhost${req.url}`;
      const headers = {};
      for (const [k, v] of Object.entries(req.headers)) {
        if (typeof v === 'string') headers[k] = v;
      }
      
      const cfRequest = new Request(url, {
        method: req.method,
        headers,
      });

      const cfResponse = await handler.fetch(cfRequest, {}, {
        waitUntil: () => {},
        passThroughOnException: () => {},
      });

      const resHeaders = {};
      cfResponse.headers.forEach((v, k) => { resHeaders[k] = v; });
      res.writeHead(cfResponse.status, resHeaders);
      
      const body = await cfResponse.arrayBuffer();
      res.end(Buffer.from(body));
      return;
    } catch(e) {
      console.error('SSR error:', e.message);
    }
  }

  res.writeHead(500, { 'Content-Type': 'text/plain' });
  res.end('Server error');
});

getSsrHandler();

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
