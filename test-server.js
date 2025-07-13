// Simple HTTP server for serving test files
import { createServer } from 'http';
import { readFile, stat } from 'fs/promises';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const PORT = 3000;

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.map': 'application/json'
};

const server = createServer(async (req, res) => {
  try {
    let filePath = req.url === '/' ? '/spec/fixtures/umd-test.html' : req.url;
    filePath = join(__dirname, filePath);
    
    const stats = await stat(filePath);
    
    if (stats.isFile()) {
      const ext = extname(filePath);
      const mimeType = mimeTypes[ext] || 'text/plain';
      
      res.setHeader('Content-Type', mimeType);
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
      
      const content = await readFile(filePath);
      res.end(content);
    } else {
      res.statusCode = 404;
      res.end('File not found');
    }
  } catch (error) {
    res.statusCode = 404;
    res.end('File not found');
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