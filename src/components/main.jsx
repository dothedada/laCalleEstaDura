import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../styles/reset.css';
import '../styles/styles.css';
import ExperienceForm from './experienceForm';

const storedCards = Object.keys(localStorage).map((cardId) =>
    JSON.parse(localStorage.getItem(cardId)),
);
const experienceCards = storedCards.filter(
    (card) => card.type === 'experience',
);

createRoot(document.getElementById('root')).render(
    <StrictMode>
        {experienceCards.map((card) => (
            <ExperienceForm data={card} key={card.id} />
        ))}
        <ExperienceForm />
    </StrictMode>,
);
