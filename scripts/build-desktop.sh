#!/bin/bash

echo "🚀 Building SVG Viewer for Desktop..."

# Create desktop dist directory
mkdir -p desktop/dist

# Build the main application first
echo "📦 Building main application..."
bun run build

# Copy built files to desktop dist
echo "📁 Copying built files..."
cp -r dist/* desktop/dist/

# Copy desktop-specific files
echo "🖥️  Copying desktop files..."
cp desktop/index.html desktop/dist/
cp desktop/sciter.ini desktop/dist/

# Build desktop entry point
echo "🔨 Building desktop entry point..."
bun build desktop/main.ts --outdir desktop/dist --target browser --minify

# Create desktop package info
echo "📋 Creating package info..."
cat > desktop/dist/package.json << EOF
{
  "name": "svgviewer-desktop",
  "version": "1.0.0",
  "description": "SVG Viewer Desktop Application",
  "main": "main.js",
  "type": "module",
  "sciter": {
    "window": {
      "title": "SVG Viewer Desktop",
      "width": 1400,
      "height": 900,
      "resizable": true,
      "maximizable": true,
      "minimizable": true
    }
  }
}
EOF

echo "✅ Desktop build complete!"
echo "📂 Files ready in: desktop/dist/"
echo ""
echo "🎯 Next steps:"
echo "1. Download Sciter.JS SDK from: https://gitlab.com/sciter-engine/sciter-js-sdk"
echo "2. Use Sciter to package your app:"
echo "   ./sciter pack --input=desktop/dist --output=svgviewer-app --platform=macos"
echo "   ./sciter pack --input=desktop/dist --output=svgviewer-app --platform=windows"
echo "   ./sciter pack --input=desktop/dist --output=svgviewer-app --platform=linux"
echo ""
echo "🎉 Your SVG Viewer is ready for desktop packaging!"
