import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Dashboard } from './components/2-main/2-pages/2-dashboard';
import './index.css';

createRoot(document.getElementById('demo-root')!).render(
    <StrictMode>
        <Dashboard />
    </StrictMode>,
);
