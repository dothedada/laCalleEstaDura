import BioForm from './formBio';
import ExperienceForm from './formExperience';
import ProfileForm from './formProfile';
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
    education: EducationPreview,
    skillsText: SkillsTextPreview,
    skillsList: SkillsListPreview,
    references: ReferencesPreview,
};

const cardFormMap = {
    profile: ProfileForm,
    bio: BioForm,
    experience: ExperienceForm,
    education: '',
    skillsText: '',
    skillsList: '',
    references: '',
};

const DynamicCard = ({ type, data, lang, inPdf, inPdfCallback }) => {
    const CardToRender = cardPreviewMap[type] || null;

    return CardToRender ? (
        <CardToRender
            data={data}
            lang={lang}
            inPdf={inPdf}
            inPdfCallback={inPdfCallback}
        />
    ) : (
        'tarjeta no encontrada'
    );
};

const DynamicForm = ({ type, data, inPdfCallback }) => {
    const FormToRender = cardFormMap[type] || null;

    return FormToRender ? (
        <FormToRender data={data} inPdfCallback={inPdfCallback} />
    ) : (
        ' formulario no encontrado'
    );
};

export { DynamicCard, DynamicForm };
