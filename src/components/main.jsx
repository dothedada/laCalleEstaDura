import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../styles/reset.css';
import '../styles/styles.css';
import cardClass from '../js/card';
import ExperienceForm from './experienceForm';
import EducationForm from './educationForm';
import ProfileForm from './profileForm';
import ContactForm from './contactForm';
import BioForm from './bioForm';
import SkillsList from './skillsList';
import SkillsText from './skillsText';
import SkillList from './skillsList';
//
// TODO:
// 6. implementación en otros tipos de tarjetas
// 6.a. creación componentes vista previa
// pre 7 REVISAR OBJETO DECK Y SU RELACION CON STOREDCARDS Y LA ACTUALIZACIÓN
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

console.log(storedCards);

createRoot(document.getElementById('root')).render(
    <StrictMode>
        {storedCards?.skillsList &&
            storedCards.skillsList.map((card) => (
                <SkillList data={card} key={card.id} inPdf={true}/>
            ))}
        <SkillsList />
        <SkillsText />
        <hr />
        {storedCards?.profile &&
            storedCards.profile.map((card) => (
                <ProfileForm data={card} key={card.id} />
            ))}
        <ProfileForm />
        {storedCards?.bio &&
            storedCards.bio.map((card) => (
                <BioForm data={card} key={card.id} />
            ))}
        <BioForm />
        {storedCards?.experience &&
            storedCards.experience.map((card) => (
                <ExperienceForm data={card} key={card.id} />
            ))}
        <ExperienceForm />
        {storedCards?.education &&
            storedCards.education.map((card) => (
                <EducationForm data={card} key={card.id} />
            ))}
        <EducationForm />
        {storedCards?.contact &&
            storedCards.contact.map((card) => (
                <ContactForm data={card} key={card.id} />
            ))}
        <ContactForm />
    </StrictMode>,
);
