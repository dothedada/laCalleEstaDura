import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../styles/reset.css';
import '../styles/styles.css';
import { DeckManager } from './decksManager';
import cardClass from '../js/card';

// TODO:
// 1. Implementar funcionalidad del deck
// 2. Completar interfase del deck (botones y selectores)
// 3. Habilitar botones de editar, copiar, eliminar y guardar de las tarjetas
// 4. administrar el estado desde el deck
// 5. creacion del modelo base
// 6. creación del pdf
// 7. revisar textos UI

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
