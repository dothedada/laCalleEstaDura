import cardClass from '../js/card';
import ExperienceForm from './experienceForm';
import EducationForm from './educationForm';
import ProfileForm from './profileForm';
import BioForm from './bioForm';
import SkillsText from './skillsText';
import SkillsList from './skillsList';
import { uiText } from './txtAndValidations';
import ReferencesForm from './ReferencesForm';

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

    return (
        <>
            <h1>la calle esta dura</h1>
            <div className="frame decks">
                <div className="cv-selector">
                    <select name="cvs" id="cvs_selector">
                        <option>carajo</option>
                    </select>
                    <div className="cv-actions">
                        <button type="button">Añadir</button>
                        <button type="button">Actualizar</button>
                        <button type="button">Eliminar</button>
                    </div>
                </div>
                <div>
                    <h2>{uiText.global.sections.Esp.profile}</h2>
                    {storedCards?.profile?.map((card) => (
                        <ProfileForm data={card} key={card.id} />
                    ))}
                    <ProfileForm />
                </div>
                <div>
                    <h2>{uiText.global.sections.Esp.bio}</h2>
                    {storedCards?.bio?.map((card) => (
                        <BioForm data={card} key={card.id} />
                    ))}
                    <BioForm />
                </div>
                <div className="split">
                    <div>
                        <h2>{uiText.global.sections.Esp.experience}</h2>
                        {storedCards?.experience?.map((card) => (
                            <ExperienceForm data={card} key={card.id} />
                        ))}
                        <ExperienceForm />
                    </div>
                    <div className="skills">
                        <div className="skills__text">
                            <h2>{uiText.global.sections.Esp.skills}</h2>
                            {storedCards?.skillsText?.map((card) => (
                                <SkillsText data={card} key={card.id} />
                            ))}
                            <SkillsText />
                        </div>
                        <div className="skills__list">
                            {storedCards?.skillsList?.map((card) => (
                                <SkillsList data={card} key={card.id} />
                            ))}
                            <SkillsList />
                        </div>
                    </div>
                </div>
                <div className="split">
                    <div>
                        <h2>{uiText.global.sections.Esp.references}</h2>
                        {storedCards?.references?.map((card) => (
                            <ReferencesForm data={card} key={card.id} />
                        ))}
                        <ReferencesForm />
                    </div>
                    <div>
                        <h2>{uiText.global.sections.Esp.education}</h2>
                        {storedCards?.education?.map((card) => (
                            <EducationForm data={card} key={card.id} />
                        ))}
                        <EducationForm />
                    </div>
                </div>
                <div className="cv-actions">
                    <button type="button">Añadir</button>
                    <button type="button">Actualizar</button>
                    <button type="button">Eliminar</button>
                </div>
            </div>
        </>
    );
};

export { DeckManager };
