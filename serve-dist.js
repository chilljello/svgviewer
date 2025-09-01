import { serve } from "bun";
import { readFile } from "fs/promises";
import { join, extname } from "path";

const PORT = 3000;

// MIME type mapping
const mimeTypes = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.otf': 'font/otf'
};

const server = serve({
  port: PORT,
  async fetch(req) {
    const url = new URL(req.url);
    let filePath = url.pathname;
    
    // Default to index.html for root
    if (filePath === '/') {
      filePath = '/index.html';
    }
    
    // Remove leading slash and join with dist directory
    const fullPath = join(process.cwd(), 'dist', filePath.slice(1));
    
    try {
      const content = await readFile(fullPath);
      const ext = extname(filePath);
      const contentType = mimeTypes[ext] || 'text/plain';
      
      return new Response(content, {
        headers: {
          'Content-Type': contentType,
          'Cache-Control': 'no-cache'
        }
      });
    } catch (error) {
      console.error(`File not found: ${filePath}`);
      return new Response('File not found', { status: 404 });
    }
  }
});

console.log(`Serving dist folder at http://localhost:${PORT}`);
console.log(`Press Ctrl+C to stop`);
