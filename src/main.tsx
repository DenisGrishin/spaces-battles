import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

import './assets/css/global.css';
import './assets/css/index.css';
import './assets/css/null.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
