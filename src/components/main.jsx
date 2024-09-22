import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../styles/reset.css';
import '../styles/styles.css';
import { DeckManager } from './decksManager';
import { Deck } from '../js/deck';

// TODO:
// 3. Habilitar botones de la barra de las tarjetas
//      - copiar,
//      - eliminar
//      - guardar
//      - actualización del deck segun cambios de la tarjeta
// 5. creacion de la vista previa renderizada
// 6. creación del pdf
// 7. revisar textos UI

const deck = new Deck();

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <DeckManager deck={deck} />
    </StrictMode>,
);
