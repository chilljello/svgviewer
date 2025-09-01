# SVG Viewer - Offline Build

This is a production-ready, offline-capable SVG viewer built with React and esbuild.

## 🚀 Quick Start

1. **Open `launch-offline.html`** in your web browser
2. **Click "Launch Viewer"** to open the main application
3. **Drag & Drop** any SVG file to start viewing

## 📁 Files

- `launch-offline.html` - Beautiful launcher page with feature overview
- `index.html` - Main SVG viewer application
- `index.js` - Bundled JavaScript application (146.5KB)

## ✨ Features

- **Drag & Drop**: Simply drag SVG files onto the viewer
- **Advanced Pan & Zoom**: 
  - Mouse wheel zoom (up to 50x)
  - Click and drag to pan
  - Extended pan area (3x window size)
- **Touch Support**: Pinch to zoom, drag to pan on mobile
- **Auto-Fit**: SVG automatically fits and centers in window on load
- **Keyboard Shortcuts**:
  - `F` - Fit to window
  - `0` - Reset view
  - `+` / `=` - Zoom in
  - `-` - Zoom out
  - `Escape` - Reset view
- **Visual Feedback**: Smooth animations and on-screen controls

## 🛠️ Technical Details

- **Framework**: React 18 with modern hooks
- **Bundler**: esbuild for fast, efficient builds
- **Bundle Size**: 146.5KB (highly optimized)
- **Format**: ES modules for modern browsers
- **Target**: ES2020 for broad compatibility
- **Minification**: Full production optimization

## 🔧 Build Process

The application is built using esbuild for optimal performance:

```bash
bunx esbuild src/index.jsx --bundle --outfile=dist/index.js --format=esm --minify --target=es2020
```

## 📱 Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## 🎯 Use Cases

- **Design Review**: Examine SVG graphics in detail
- **Documentation**: Navigate complex diagrams and charts
- **Presentation**: Display SVG content with smooth controls
- **Mobile Viewing**: Touch-friendly interface for tablets and phones
- **Offline Work**: No internet connection required

## 🚀 Performance

- **Fast Loading**: Optimized bundle with minimal dependencies
- **Smooth Interactions**: 60fps pan and zoom animations
- **Memory Efficient**: Optimized rendering and state management
- **Responsive**: Adapts to any screen size and device

**Built with ❤️ using React and esbuild**
