#!/bin/bash

echo "🧪 Testing Desktop Build..."

# Check if desktop dist exists
if [ ! -d "desktop/dist" ]; then
    echo "❌ Desktop dist not found. Run 'bun run build-desktop' first."
    exit 1
fi

echo "✅ Desktop dist found"
echo "📁 Files in desktop/dist/:"
ls -la desktop/dist/

echo ""
echo "🌐 Starting test server for desktop build..."
echo "📱 Open http://localhost:3001 in your browser"
echo "🖥️  This simulates how the desktop app will look"
echo "⏹️  Press Ctrl+C to stop"

# Serve the desktop build on a different port
cd desktop/dist
python3 -m http.server 3001 2>/dev/null || python3 -m SimpleHTTPServer 3001 2>/dev/null || echo "❌ Python not found. Please install Python to test the desktop build."
