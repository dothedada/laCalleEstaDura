import ExperienceForm from './experienceForm';
import EducationForm from './educationForm';
import ProfileForm from './profileForm';
import ContactForm from './contactForm';
import BioForm from './bioForm';
import SkillsList from './skillsList';
import SkillsText from './skillsText';
import SkillList from './skillsList';

const container = (data, cvs) => {
    return (
        <>
            <h1>la calle esta dura</h1>
            <div className="cv-selector">
                <select name="cvs" id="cvs_selector">
                    <option value="value"></option>
                </select>
            </div>
            <div className="cv-cards">
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
            <div className="cv-actions">
                <button type="button">Añadir</button>
                <button type="button">Actualizar</button>
                <button type="button">Eliminar</button>
            </div>
        </>
    );
};

return container;
