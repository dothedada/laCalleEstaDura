import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../styles/reset.css';
import '../styles/styles.css';
import { DeckManager } from './decksManager';
import cardClass from '../js/card';

// TODO:
// 1. Implementar funcionalidad del deck
//      - crear modelo
//      - duplicar modelo
//      - Borrar modelo
// 3. Habilitar botones de la barra de las tarjetas
//      - copiar,
//      - eliminar
//      - guardar
//      - actualización del deck segun cambios de la tarjeta
// 4. administrar el estado desde el deck
//      - Actualización del deck acorde al modelo
// 5. creacion de la vista previa renderizada
// 6. creación del pdf
// 7. revisar textos UI
//
const userDeck = Object.keys(localStorage).reduce((deck, card) => {
    const parsedCard = JSON.parse(localStorage.getItem(card));
    const typeKey = /^skills/.test(parsedCard.type)
        ? 'skills'
        : parsedCard.type;

    if (!deck[typeKey]) deck[typeKey] = []
    deck[typeKey].push(new cardClass[parsedCard.type](parsedCard))

    return deck
}, {});

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <DeckManager cards={userDeck} />
    </StrictMode>,
);
