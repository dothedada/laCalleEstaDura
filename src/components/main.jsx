import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../styles/reset.css';
import '../styles/styles.css';
import { DeckManager } from './decksManager';
import { Deck } from '../js/deck';

// TODO:
// 5. creacion de la vista previa renderizada
// 6. creación del pdf
// 7. orden de las tarjetas
// 7. revisar textos y UI
// 8. montar en vercel

const deck = new Deck();

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <DeckManager deck={deck} />
    </StrictMode>,
);
