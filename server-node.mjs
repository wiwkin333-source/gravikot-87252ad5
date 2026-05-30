import { createServer } from 'node:http';
import { readFile, stat, readdir } from 'node:fs/promises';
import { join, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const clientDir = join(__dirname, 'dist/client');
const assetsDir = join(__dirname, 'dist/server/assets');
const PORT = process.env.PORT || 80;

const mimeTypes = {
  '.html': 'text/html; charset=utf-8', '.js': 'application/javascript',
  '.mjs': 'application/javascript', '.css': 'text/css', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon', '.json': 'application/json', '.woff2': 'font/woff2',
  '.woff': 'font/woff', '.mp4': 'video/mp4', '.webm': 'video/webm',
  '.gif': 'image/gif', '.webp': 'image/webp',
};

let ssrHandler = null;

async function getSsrHandler() {
  if (ssrHandler) return ssrHandler;

  const files = await readdir(assetsDir);

  // Стратегия 1: worker-entry (Docker сборка)
  const workerFile = files.find(f => f.startsWith('worker-entry'));
  if (workerFile) {
    const mod = await import(`./dist/server/assets/${workerFile}`);
    const handler = mod.default || mod.w || Object.values(mod)[0];
    if (handler && typeof handler.fetch === 'function') {
      ssrHandler = handler;
      console.log(`SSR loaded from worker-entry: ${workerFile}`);
      return ssrHandler;
    }
  }

  // Стратегия 2: server-*.js с mod.s.default (локальная сборка)
  const serverFile = files.find(f => f.startsWith('server-') && f.endsWith('.js'));
  if (serverFile) {
    const mod = await import(`./dist/server/assets/${serverFile}`);
    const handler = mod?.s?.default || mod.default;
    if (handler && typeof handler.fetch === 'function') {
      ssrHandler = handler;
      console.log(`SSR loaded from server file: ${serverFile}`);
      return ssrHandler;
    }
  }

  console.error('SSR handler not found!', files);
  return null;
}

const server = createServer(async (req, res) => {
  const urlPath = req.url.split('?')[0];

  // Статические файлы из dist/client
  try {
    const s = await stat(join(clientDir, urlPath));
    if (s.isFile()) {
      const data = await readFile(join(clientDir, urlPath));
      const ext = extname(urlPath);
      res.writeHead(200, {
        'Content-Type': mimeTypes[ext] || 'application/octet-stream',
        'Cache-Control': ext === '.html' ? 'no-cache' : 'public, max-age=31536000'
      });
      res.end(data);
      return;
    }
  } catch {}

  // SSR
  const handler = await getSsrHandler();
  if (handler) {
    try {
      const headers = {};
      for (const [k, v] of Object.entries(req.headers)) {
        if (typeof v === 'string') headers[k] = v;
      }
      const cfResponse = await handler.fetch(
        new Request(`http://localhost${req.url}`, { method: req.method, headers }),
        {}, { waitUntil: () => {}, passThroughOnException: () => {} }
      );
      const resHeaders = {};
      cfResponse.headers.forEach((v, k) => { resHeaders[k] = v; });
      res.writeHead(cfResponse.status, resHeaders);
      res.end(Buffer.from(await cfResponse.arrayBuffer()));
      return;
    } catch(e) {
      console.error('SSR error:', e.message);
    }
  }

  res.writeHead(500, { 'Content-Type': 'text/plain' });
  res.end('Server error');
});

getSsrHandler();
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
