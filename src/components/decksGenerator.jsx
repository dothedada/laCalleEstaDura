import BioPreview from './previewBio';
import ExperiencePreview from './previewExperience';
import ProfilePreview from './previewProfile';

const cardPreviewMap = {
    profile: ProfilePreview,
    bio: BioPreview,
    experience: ExperiencePreview,
    // education: '',
    // skillsText: '',
    // skillsList: '',
    // references: '',
};

const DynamicCard = ({
    type,
    data,
    lang = 'Esp',
    inPdf = true,
    inPdfCallback,
}) => {
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
