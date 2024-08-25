import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../styles/reset.css';
import '../styles/styles.css';
import ExperienceForm from './experienceForm';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <ExperienceForm data={{ reference: '123' }} />
        <ExperienceForm />
    </StrictMode>,
);
