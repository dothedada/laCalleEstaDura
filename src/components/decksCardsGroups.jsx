import { DynamicCard } from './decksGenerator';
import { Button } from './formComponents';
import { uiText } from './txtAndValidations';
import { DynamicForm } from './decksGenerator';
import CardWrapper from './cardWrapper';

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
    const openCardForm =
        (type, cardData, update = false) =>
        () => {
            dialogHandler(() => (
                <DynamicForm
                    type={type}
                    data={cardData}
                    cardsManager={cardsManager}
                    inPdfCallback={inPdfHandler(cardData?.id)}
                    update={update}
                />
            ));
            dialogRef.current.open();
        };

    // <DynamicCard
    //     data={card}
    //     lang={lang}
    //     editHandler={openCardForm(card.type, card, true)}
    //     duplicateHandler={openCardForm(card.type, card, false)}
    //     inPdf={renderInPdf.has(card.id)}
    //     inPdfCallback={inPdfHandler(card.id)}
    //     key={card.id}
    // />
    return (
        <div>
            <h2>{uiText.global.sections[lang][deckType]}</h2>

            {cards?.map((card) => (
                <CardWrapper
                    data={card}
                    editHandler={openCardForm(card.type, card, true)}
                    duplicateHandler={openCardForm(card.type, card, false)}
                    inPdf={renderInPdf.has(card.id)}
                    inPdfCallback={inPdfHandler(card.id)}
                    key={card.id}
                >
                    <DynamicCard data={card} lang={lang} />
                </CardWrapper>
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
