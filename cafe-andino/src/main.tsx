import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css'; // estilos globales: variables de color, botones y campos

// PUNTO DE ENTRADA: React toma el <div id="root"> de index.html y dibuja <App /> dentro.
// El "!" le dice a TypeScript: "confía en mí, este elemento existe".
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
