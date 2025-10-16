import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Demo_Dashboard } from './components/2-main/1-pages/1-dashboard';
import './index.css';

createRoot(document.getElementById('demo-root')!).render(
    <StrictMode>
        <Demo_Dashboard />
    </StrictMode>,
);
