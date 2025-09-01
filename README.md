# SVG Viewer - Bun Compatible React Application

A modern, offline-capable SVG viewer built with React and Bun, featuring drag-and-drop functionality with pan and zoom capabilities.

## Features

- **Drag & Drop**: Simply drag SVG files into the browser window
- **Pan & Zoom**: Mouse wheel to zoom, click and drag to pan
- **Offline Support**: Works completely offline once loaded
- **Fast Build**: Built with Bun for rapid development and building
- **Modern React**: Uses React 18 with hooks and modern patterns

## Prerequisites

- **Bun**: JavaScript runtime and package manager
- **Modern Browser**: Chrome, Firefox, Safari, or Edge with ES6+ support

## Installation

### 1. Install Bun

If you don't have Bun installed, install it first:

```bash
curl -fsSL https://bun.sh/install | bash
```

Verify installation:
```bash
bun --version
```

### 2. Clone and Setup

```bash
git clone <repository-url>
cd svg-viewer
bun install
```

## Development

### Start Development Server

```bash
bun run dev
```

The application will be available at `http://localhost:3000` with hot reload enabled.

### Build for Production

```bash
bun run build
```

This creates a `dist/` directory with the production build.

### Serve Production Build

```bash
bunx serve ./dist
```

## Project Structure

```
svg-viewer/
├── src/
│   ├── App.jsx          # Main React component
│   └── index.js         # Application entry point
├── dist/                # Production build output
├── index.html           # HTML template
├── package.json         # Dependencies and scripts
├── bunfig.toml         # Bun configuration
└── README.md           # This file
```

## Usage

1. **Load SVG Files**: Drag and drop any SVG file into the browser window
2. **Zoom**: Use mouse wheel to zoom in/out
3. **Pan**: Click and drag to move the SVG around
4. **Reset**: Drop a new SVG file to reset the view

## Technical Details

- **Framework**: React 18 with modern hooks
- **Build Tool**: Bun with built-in bundler
- **Styling**: Inline styles for offline compatibility
- **File Handling**: Client-side FileReader API
- **Transformations**: CSS transforms for pan and zoom

## Scripts

- `bun run dev` - Start development server with hot reload
- `bun run start` - Alias for dev command
- `bun run build` - Build production bundle

## Browser Compatibility

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## Offline Considerations

The application works completely offline once loaded. All dependencies are bundled into a single JavaScript file, and SVG processing happens entirely in the browser using the FileReader API.

## Performance

- **Build Time**: ~75ms for development builds
- **Bundle Size**: Optimized for production with Bun's bundler
- **Runtime**: Fast SVG rendering with efficient event handling

## Troubleshooting

### Build Issues
- Ensure Bun is properly installed: `bun --version`
- Clear node_modules: `rm -rf node_modules && bun install`

### Runtime Issues
- Check browser console for JavaScript errors
- Verify SVG file format is valid
- Ensure browser supports FileReader API

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test with `bun run dev`
5. Submit a pull request

## License

This project is open source and available under the MIT License.
