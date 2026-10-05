import React from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource/allura/latin-400.css';
import '@fontsource/alegreya/latin-400.css';
import '@fontsource/alegreya/latin-400-italic.css';
import '@fontsource/figtree/latin-400.css';
import '@fontsource/figtree/latin-600.css';
import App from './App.jsx';
import { MOTION_SPEED } from './motion.js';
import './styles.css';

document.documentElement.style.setProperty('--motion-speed', String(MOTION_SPEED));

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
