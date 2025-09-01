# SVG Viewer Desktop - Sciter.JS Packaging Guide

This guide explains how to package your SVG Viewer application into a native desktop application using Sciter.JS.

## Prerequisites

1. **Sciter.JS SDK**: Download from [https://gitlab.com/sciter-engine/sciter-js-sdk](https://gitlab.com/sciter-engine/sciter-js-sdk)
2. **Built Application**: Run `bun run build-desktop` first

## Quick Start

```bash
# 1. Build the desktop application
bun run build-desktop

# 2. Download Sciter.JS SDK and extract it
# 3. Navigate to Sciter SDK directory
cd /path/to/sciter-js-sdk

# 4. Package for your platform
```

## Platform-Specific Packaging

### macOS
```bash
./sciter pack --input=../svgviewer/desktop/dist --output=svgviewer-mac --platform=macos
```

### Windows
```bash
./sciter pack --input=../svgviewer/desktop/dist --output=svgviewer-win --platform=windows
```

### Linux
```bash
./sciter pack --input=../svgviewer/desktop/dist --output=svgviewer-linux --platform=linux
```

## Advanced Packaging Options

### Custom Window Configuration
```bash
./sciter pack \
  --input=desktop/dist \
  --output=svgviewer-custom \
  --platform=macos \
  --window-title="Custom SVG Viewer" \
  --window-width=1600 \
  --window-height=1000
```

### Icon and Metadata
```bash
./sciter pack \
  --input=desktop/dist \
  --output=svgviewer-with-icon \
  --platform=macos \
  --icon=icon.icns \
  --app-name="SVG Viewer Pro" \
  --app-version="1.0.0"
```

## File Structure

```
desktop/
├── dist/                 # Built application files
│   ├── index.html       # Desktop HTML wrapper
│   ├── main.js          # Desktop entry point
│   ├── index.js         # Main app bundle
│   ├── sciter.ini      # Sciter configuration
│   └── package.json     # App metadata
├── index.html           # Desktop HTML template
├── main.ts              # Desktop TypeScript entry
├── sciter.ini           # Sciter configuration
└── README.md            # This file
```

## Sciter Configuration (sciter.ini)

The `sciter.ini` file controls the desktop window behavior:

```ini
[main]
window-title=SVG Viewer Desktop
window-width=1400
window-height=900
window-resizable=true
window-maximizable=true
window-minimizable=true
window-center=true

[features]
scripting=true
file-system=true
context-menu=true
backdrop-blur=true
```

## Features

- ✅ **Native Performance**: Runs as true desktop application
- ✅ **File System Access**: Direct SVG file loading
- ✅ **Window Management**: Native desktop controls
- ✅ **Modern UI**: Dark theme with backdrop blur
- ✅ **Cross-Platform**: Windows, macOS, and Linux support

## Troubleshooting

### Build Issues
```bash
# Clean and rebuild
rm -rf desktop/dist
bun run build-desktop
```

### Sciter Issues
- Ensure Sciter.JS SDK is properly extracted
- Check platform compatibility
- Verify file paths in packaging commands

### Runtime Issues
- Check console for JavaScript errors
- Verify all dependencies are bundled
- Test with simple HTML first

## Next Steps

After successful packaging:

1. **Test the Application**: Run the packaged executable
2. **Distribute**: Share the packaged application
3. **Customize**: Modify `sciter.ini` for different configurations
4. **Optimize**: Adjust bundle size and performance

## Support

- **Sciter Documentation**: [https://docs.sciter.com](https://docs.sciter.com)
- **Sciter.JS SDK**: [https://gitlab.com/sciter-engine/sciter-js-sdk](https://gitlab.com/sciter-engine/sciter-js-sdk)
- **Community**: Sciter forums and documentation

---

**Happy Desktop App Development! 🚀**
