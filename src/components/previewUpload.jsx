import { uiText } from './txtAndValidations';

const PreviewCardsUpload = ({ stats }) => {
    const resume = (type, inFile, duplicates) => {
        const inLS = duplicates.length;
        return (
            <>
                <div>
                    {uiText.global.dialog.upload.cards.total(inFile, type)}{' '}
                    {inLS > 0 && uiText.global.dialog.upload.cards.inLS(inLS)}
                </div>
                {inLS > 0 && (
                    <>
                        <h3>
                            {uiText.global.dialog.upload.cards.substitutionWarn(
                                type,
                                inFile,
                            )}
                        </h3>
                        <ul>
                            {duplicates.map((card, index) => (
                                <div key={index}>{card}</div>
                            ))}
                        </ul>
                    </>
                )}
            </>
        );
    };
    return (
        <>
            {resume('CVs', stats.cvsInFile, stats.duplicatedCVs)}
            {resume('cards', stats.cardsInFile, stats.duplicatedCards)}
        </>
    );
};

export default PreviewCardsUpload;
