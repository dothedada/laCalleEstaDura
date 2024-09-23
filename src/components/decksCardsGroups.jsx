import { DynamicCard } from './decksGenerator';
import { Button } from './formComponents';
import { uiText } from './txtAndValidations';

const CardsGroup = ({
    cards,
    deckType,
    lang,
    renderInPdf,
    inPdfHandler,
    dialogHandler,
}) => {
    return (
        <div>
            <h2>{uiText.global.sections[lang][deckType]}</h2>

            {cards?.map((card) => (
                <DynamicCard
                    data={card}
                    lang={lang}
                    editHandler={() => console.log('editar', card.id)}
                    duplicateHandler={() => console.log('duplicar', card.id)}
                    inPdf={renderInPdf.has(card.id)}
                    inPdfCallback={inPdfHandler(card.id)}
                    key={card.id}
                />
            ))}

            {deckType !== 'skills' ? (
                <Button
                    type="button"
                    text={uiText[deckType].reference}
                    callback={dialogHandler(deckType)}
                />
            ) : (
                <>
                    <Button
                        type="button"
                        text={uiText.skillsList.reference}
                        callback={dialogHandler('skillsList')}
                    />
                    <Button
                        type="button"
                        text={uiText.skillsText.reference}
                        callback={dialogHandler('skillsText')}
                    />
                </>
            )}
        </div>
    );
};

export default CardsGroup;
