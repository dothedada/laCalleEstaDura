import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../styles/reset.css';
import '../styles/styles.css';
import ExperienceForm from './experienceForm';
import cardClass from '../js/card';

// TODO:
// 6. implementación en otros tipos de tarjetas
// 6.a. creación componentes vista previa
// 7. creación del componente contenedor de los dormularios
// 7.a. levantar el estado del render en pdf
// 7.b creacion del modelo base
// 8. creación del pdf

const storedCards = Object.keys(localStorage)
    .map((cardId) => JSON.parse(localStorage.getItem(cardId)))
    .reduce((deck, card) => {
        if (!deck[card.type]) {
            deck[card.type] = [];
        }
        deck[card.type].push(new cardClass[card.type](card));
        return deck;
    }, {});

console.log(storedCards)

createRoot(document.getElementById('root')).render(
    <StrictMode>
        {storedCards.experience.map((card) => (
            <ExperienceForm data={card} key={card.id} />
        ))}
        <ExperienceForm />
    </StrictMode>,
);
