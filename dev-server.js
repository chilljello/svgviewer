import { serve } from "bun";
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
    
    try {
      // Handle TSX files by building them on-the-fly
      if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
        const fullPath = join(process.cwd(), filePath.slice(1));
        const file = Bun.file(fullPath);
        const exists = await file.exists();
        
        if (!exists) {
          return new Response('File not found', { status: 404 });
        }
        
        // Build the TSX file to JavaScript
        const result = await Bun.build({
          entrypoints: [fullPath],
          target: 'browser',
          format: 'esm',
          minify: false,
          sourcemap: 'external'
        });
        
        if (!result.success) {
          console.error('Build failed:', result.logs);
          return new Response('Build failed', { status: 500 });
        }
        
        const output = await result.outputs[0].text();
        return new Response(output, {
          headers: { 'Content-Type': 'application/javascript' }
        });
      }
      
      // For other files, serve them directly
      const fullPath = join(process.cwd(), filePath.slice(1));
      const file = Bun.file(fullPath);
      const exists = await file.exists();
      
      if (!exists) {
        return new Response('File not found', { status: 404 });
      }
      
      const content = await file.text();
      
      // Get file extension for MIME type
      const ext = extname(filePath);
      const mimeType = mimeTypes[ext] || 'application/octet-stream';
      
      return new Response(content, {
        headers: { 'Content-Type': mimeType }
      });
    } catch (error) {
      console.error('Error serving file:', error);
      return new Response('Internal server error', { status: 500 });
    }
  }
});

console.log(`Dev server running at http://localhost:${PORT}`);
console.log('Serving TSX files with Bun build on-the-fly');
