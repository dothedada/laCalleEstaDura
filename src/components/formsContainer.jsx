import ExperienceForm from './experienceForm';
import EducationForm from './educationForm';
import ProfileForm from './profileForm';
import ContactForm from './contactForm';
import BioForm from './bioForm';
import SkillsList from './skillsList';
import SkillsText from './skillsText';
import SkillList from './skillsList';

const storedCards = Object.keys(localStorage)
    .map((cardId) => JSON.parse(localStorage.getItem(cardId)))
    .reduce((deck, card) => {
        if (!deck[card.type]) {
            deck[card.type] = [];
        }
        deck[card.type].push(new cardClass[card.type](card));
        return deck;
    }, {});

const container = (data) => {
    return (
        <>
            <h1>la calle esta dura</h1>
            <div className="cv">
                <div className="contact">
                    <div className="contact__name">nombres</div>
                    <div className="contact__info">Info de contactoº</div>
                </div>
                <div className="bio">
                    <div className="bio__txt">perfiles</div>
                </div>
                <div className="knowledge">
                    <div className="knowledge__experience">
                        experiencias de trabajo relevantes
                    </div>
                    <div className="knowledge__skills">
                        <div className="skills__text">texto de habilidades</div>
                        <div className="skills__list">lista de habilidades</div>
                    </div>
                </div>
                <div className="references">
                    <div className="references__work">nombres</div>
                    <div className="references__studies">Info de contactoº</div>
                </div>
            </div>
        </>
    );
};

return container;
