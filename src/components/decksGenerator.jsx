import BioForm from './formBio';
import EducationForm from './formEducation';
import ExperienceForm from './formExperience';
import ProfileForm from './formProfile';
import ReferencesForm from './formReferences';
import SkillsListForm from './formSkillsList';
import SkillsTextForm from './formSkillsText';
import BioPreview from './previewBio';
import EducationPreview from './previewEducation';
import ExperiencePreview from './previewExperience';
import ProfilePreview from './previewProfile';
import ReferencesPreview from './previewReferences';
import SkillsListPreview from './previewSkillsList';
import SkillsTextPreview from './previewSkillsText';

const cardPreviewMap = {
    profile: ProfilePreview,
    bio: BioPreview,
    experience: ExperiencePreview,
    skillsText: SkillsTextPreview,
    skillsList: SkillsListPreview,
    education: EducationPreview,
    references: ReferencesPreview,
};

const cardFormMap = {
    profile: ProfileForm,
    bio: BioForm,
    experience: ExperienceForm,
    skillsText: SkillsTextForm,
    skillsList: SkillsListForm,
    education: EducationForm,
    references: ReferencesForm,
};

const DynamicCard = ({
    data,
    lang,
    inPdf,
    inPdfCallback,
    editHandler,
    duplicateHandler,
}) => {
    const CardToRender = cardPreviewMap[data.type] || null;

    return CardToRender ? (
        <CardToRender
            data={data}
            lang={lang}
            inPdf={inPdf}
            inPdfCallback={inPdfCallback}
            editHandler={editHandler}
            duplicateHandler={duplicateHandler}
        />
    ) : (
        'tarjeta no encontrada'
    );
};

const DynamicForm = ({ type, data, cardsManager, inPdfCallback }) => {
    const FormToRender = cardFormMap[type] || null;

    return FormToRender ? (
        <FormToRender
            data={data}
            cardsManager={cardsManager}
            inPdfCallback={inPdfCallback}
        />
    ) : (
        'formulario no encontrado'
    );
};

export { DynamicCard, DynamicForm };
