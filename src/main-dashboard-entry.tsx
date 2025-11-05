import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { DashboardAsApp } from './components/2-main/2-pages/2-dashboard-iframe';
import './index.css';

createRoot(document.getElementById('demo-root')!).render(
    <StrictMode>
        <DashboardAsApp />
    </StrictMode>,
);
