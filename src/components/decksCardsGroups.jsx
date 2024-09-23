import { DynamicCard } from './decksGenerator';
import { Button } from './formComponents';
import { uiText } from './txtAndValidations';
import { DynamicForm } from './decksGenerator';

const CardsGroup = ({
    cards,
    cardsManager,
    deckType,
    lang,
    renderInPdf,
    inPdfHandler,
    dialogRef,
    dialogHandler,
}) => {
    const openCardForm = (type, cardData) => () => {
        dialogRef.current.open();
        dialogHandler(
            <DynamicForm
                type={type}
                data={cardData}
                cardsManager={{ ...cardsManager, dialogRef, dialogHandler }}
                inPdfCallback={inPdfHandler(cardData?.id)}
            />,
        );
    };

    return (
        <div>
            <h2>{uiText.global.sections[lang][deckType]}</h2>

            {cards?.map((card) => (
                <DynamicCard
                    data={card}
                    lang={lang}
                    editHandler={openCardForm(deckType, card)}
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
                    callback={openCardForm(deckType)}
                />
            ) : (
                <>
                    <Button
                        type="button"
                        text={uiText.skillsList.reference}
                        callback={openCardForm('skillsList')}
                    />
                    <Button
                        type="button"
                        text={uiText.skillsText.reference}
                        callback={openCardForm('skillsText')}
                    />
                </>
            )}
        </div>
    );
};

export default CardsGroup;
