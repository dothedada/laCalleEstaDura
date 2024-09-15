import ProfilePreview from './profilePreview';

const cardPreviewMap = {
    profile: ProfilePreview,
    bio: '',
    experience: '',
    education: '',
    skillsText: '',
    skillsList: '',
    references: '',
};

const cardGroups = [
    'profile',
    'bio',
    'experience',
    'education',
    'skills',
    'references',
];

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

export { cardGroups, DynamicCard };
