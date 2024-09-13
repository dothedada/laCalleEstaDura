import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../styles/reset.css';
import '../styles/styles.css';
import cardClass from '../js/card';
import { DeckManager } from './formsContainer';
import ExperienceForm from './experienceForm';

// TODO:
// 6. implementación en otros tipos de tarjetas
// 6.a. creación componentes vista previa
// pre 7 REVISAR OBJETO DECK Y SU RELACION CON STOREDCARDS Y LA ACTUALIZACIÓN
// 7. creación del componente contenedor de los dormularios
// 7.a. levantar el estado del render en pdf
// 7.b creacion del modelo base
// 8. creación del pdf


createRoot(document.getElementById('root')).render(
    <StrictMode>
        <DeckManager />
    </StrictMode>,
);
