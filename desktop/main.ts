import React from 'react';
import { createRoot } from 'react-dom/client';
import App from '../src/App';

// Sciter-specific initialization
document.addEventListener('DOMContentLoaded', () => {
  console.log('SVG Viewer Desktop App Initializing...');
  
  // Initialize any Sciter-specific features
  if (typeof (window as any).sciter !== 'undefined') {
    console.log('Sciter runtime detected');
    
    // Set up Sciter-specific window properties
    (window as any).sciter.setWindowTitle('SVG Viewer Desktop');
  }
});

// Mount the React app
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
}

const root = createRoot(rootElement);
root.render(React.createElement(App));

// Export for Sciter
export { App };
