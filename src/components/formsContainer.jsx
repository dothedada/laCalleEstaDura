import cardClass from '../js/card';
import ExperienceForm from './experienceForm';
import EducationForm from './educationForm';
import ProfileForm from './profileForm';
import ContactForm from './contactForm';
import BioForm from './bioForm';
import SkillsText from './skillsText';
import SkillsList from './skillsList';

const DeckManager = () => {
    const storedCards = Object.keys(localStorage)
        .map((cardId) => JSON.parse(localStorage.getItem(cardId)))
        .reduce((deck, card) => {
            if (!deck[card.type]) {
                deck[card.type] = [];
            }
            deck[card.type].push(new cardClass[card.type](card));
            return deck;
        }, {});

    const renderedCards = storedCards.rendered || null;

    return (
        <>
            <h1>la calle esta dura</h1>
            <div className="cv-selector">
                <select name="cvs" id="cvs_selector">
                    <option>carajo</option>
                </select>
            </div>
            <div className="cv-cards">
                <div className="contact">
                    {storedCards?.profile &&
                        storedCards.profile.map((card) => (
                            <ProfileForm data={card} key={card.id} />
                        ))}
                </div>
                <div className="bio">
                    {storedCards?.bio &&
                        storedCards.bio.map((card) => (
                            <BioForm data={card} key={card.id} />
                        ))}
                </div>
                <div className="knowledge">
                    <div className="knowledge__experience">
                        {storedCards?.experience
                            ? storedCards.experience.map((card) => (
                                  <ExperienceForm data={card} key={card.id} />
                              ))
                            : 'carajo'}
                        <ExperienceForm />
                    </div>
                    <div className="knowledge__skills">
                        <div className="skills__text">
                            {storedCards?.skillsText &&
                                storedCards.skillsText.map((card) => (
                                    <SkillsText data={card} key={card.id} />
                                ))}
                        </div>
                        <div className="skills__list">
                            {storedCards?.skillsList &&
                                storedCards.skillsList.map((card) => (
                                    <SkillsList data={card} key={card.id} />
                                ))}
                        </div>
                    </div>
                </div>
                <div className="references">
                    <div className="references__work">
                        {storedCards?.contact &&
                            storedCards.contact.map((card) => (
                                <ContactForm data={card} key={card.id} />
                            ))}
                    </div>
                    <div className="references__studies">
                        {storedCards?.education &&
                            storedCards.education.map((card) => (
                                <EducationForm data={card} key={card.id} />
                            ))}
                    </div>
                </div>
            </div>
            <div className="cv-actions">
                <button type="button">Añadir</button>
                <button type="button">Actualizar</button>
                <button type="button">Eliminar</button>
            </div>
        </>
    );
};

export { DeckManager };
