import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../styles/reset.css';
import '../styles/styles.css';
import { DeckManager } from './decksManager';
import cardClass from '../js/card';

// TODO:
// 1. Creación de lo modales de formulario
// 2. Implementar interfase del deck
// 3. Completar interfase del deck
// 4. administrar el estado desde el deck
// 5. levantar el estado del render en pdf
// 6. creacion del modelo base
// 7. creación del pdf

const groupedCards = Object.keys(localStorage)
    .map((cardId) => JSON.parse(localStorage.getItem(cardId)))
    .reduce((deck, card) => {
        const typeKey = /^skills/.test(card.type) ? 'skills' : card.type;

        if (!deck[typeKey]) deck[typeKey] = [];
        deck[typeKey].push(new cardClass[card.type](card));

        return deck;
    }, {});

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <DeckManager cards={groupedCards} />
    </StrictMode>,
);
