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
                    {data?.profile &&
                        data.profile.map((card) => (
                            <ProfileForm data={card} key={card.id} />
                        ))}
                </div>
                <div className="bio">
                    {data?.bio &&
                        data.bio.map((card) => (
                            <ProfileForm data={card} key={card.id} />
                        ))}
                </div>
                <div className="knowledge">
                    <div className="knowledge__experience">
                        {data?.experience &&
                            data.experience.map((card) => (
                                <ProfileForm data={card} key={card.id} />
                            ))}
                    </div>
                    <div className="knowledge__skills">
                        <div className="skills__text">
                            {data?.skillsText &&
                                data.skillsText.map((card) => (
                                    <ProfileForm data={card} key={card.id} />
                                ))}
                        </div>
                        <div className="skills__list">
                            {data?.skillsList &&
                                data.skillsList.map((card) => (
                                    <ProfileForm data={card} key={card.id} />
                                ))}
                        </div>
                    </div>
                </div>
                <div className="references">
                    <div className="references__work">
                        {data?.contact &&
                            data.contact.map((card) => (
                                <ProfileForm data={card} key={card.id} />
                            ))}
                    </div>
                    <div className="references__studies">
                        {data?.education &&
                            data.education.map((card) => (
                                <ProfileForm data={card} key={card.id} />
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

return { container };
