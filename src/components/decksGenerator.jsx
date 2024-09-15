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
        'componente no encontrado'
    );
};

export { DynamicCard };
