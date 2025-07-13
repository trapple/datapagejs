// Simple HTTP server for serving test files
import { createServer } from 'http';
import { readFile, stat } from 'fs/promises';
import { extname, resolve, sep } from 'path';
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

    // Convert to POSIX path format for consistent handling across platforms
    requestPath = requestPath.replace(/\\/g, '/');

    // Remove leading slashes and prevent directory traversal attacks
    requestPath = requestPath.replace(/^\/+/, '');

    // Allow access to dist/ folder through relative paths but prevent other traversals
    if (requestPath.includes('../')) {
      // Allow specific legitimate paths to dist folder (normalized to POSIX paths)
      const allowedPaths = [
        'spec/fixtures/../../dist/datapage.js',
        'spec/fixtures/../../dist/datapage.esm.js',
        'spec/fixtures/../../dist/datapage.cjs',
        'spec/fixtures/../../dist/datapage.min.js',
        '../../dist/datapage.js',
        '../../dist/datapage.esm.js',
        '../../dist/datapage.cjs',
        '../../dist/datapage.min.js',
      ];

      if (allowedPaths.includes(requestPath)) {
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

    // Convert to platform-specific path and resolve
    const platformPath = requestPath.split('/').join(sep);
    const fullPath = resolve(__dirname, platformPath);
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
