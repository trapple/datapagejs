// Simple HTTP server for serving test files
import { createServer } from 'http';
import { readFile, stat } from 'fs/promises';
import { extname, normalize, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const PORT = 3000;

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.map': 'application/json',
};

const server = createServer(async (req, res) => {
  try {
    // Sanitize URL to prevent directory traversal attacks
    let requestPath =
      req.url === '/' ? '/spec/fixtures/umd-test.html' : req.url;

    // Decode and normalize the path
    requestPath = decodeURIComponent(requestPath);
    requestPath = normalize(requestPath);

    // Remove leading slashes and prevent directory traversal attacks
    requestPath = requestPath.replace(/^\/+/, '');

    // Allow access to dist/ folder through relative paths but prevent other traversals
    if (requestPath.includes('../')) {
      // Only allow legitimate access to dist folder from fixtures (.js, .esm.js, .cjs, .min.js files)
      if (
        requestPath.match(
          /^(spec\/fixtures\/)?\.\.\/\.\.\/dist\/[^/]+\.(esm\.js|min\.js|js|cjs)$/
        )
      ) {
        // This is a legitimate access to dist folder from fixtures
        requestPath = requestPath.replace(
          /^(spec\/fixtures\/)?\.\.\/\.\.\//,
          ''
        );
      } else {
        // Block other directory traversal attempts
        requestPath = requestPath.replace(/\.\.\//g, '');
      }
    }

    // Resolve the full path and ensure it's within the base directory
    const fullPath = resolve(__dirname, requestPath);
    const basePath = resolve(__dirname);

    if (!fullPath.startsWith(basePath)) {
      res.statusCode = 403;
      res.end('Forbidden');
      return;
    }

    const filePath = fullPath;

    const stats = await stat(filePath);

    if (stats.isFile()) {
      const ext = extname(filePath);
      const mimeType = mimeTypes[ext] || 'text/plain';

      res.setHeader('Content-Type', mimeType);
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, DELETE, OPTIONS'
      );
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

      const content = await readFile(filePath);
      console.log(`Serving file: ${filePath} (${content.length} bytes)`);
      res.end(content);
    } else {
      res.statusCode = 404;
      res.end('File not found');
    }
  } catch (error) {
    if (error.code === 'ENOENT') {
      res.statusCode = 404;
      res.end('File not found');
    } else {
      console.error('Server error:', error.stack);
      res.statusCode = 500;
      res.end('Internal server error');
    }
  }
});

server.listen(PORT, () => {
  console.log(`Test server running at http://localhost:${PORT}`);
  console.log(`UMD Test: http://localhost:${PORT}/spec/fixtures/umd-test.html`);
  console.log(`ESM Test: http://localhost:${PORT}/spec/fixtures/esm-test.html`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('Shutting down server...');
  server.close();
});

process.on('SIGINT', () => {
  console.log('Shutting down server...');
  server.close();
});
