import { DynamicCard } from './decksGenerator';
import { Button } from './formComponents';
import { uiText } from './txtAndValidations';
import { DynamicForm } from './decksGenerator';

const CardsGroup = ({
    cards,
    deckType,
    lang,
    renderInPdf,
    inPdfHandler,
    dialogRef,
    dialogHandler,
}) => {
    const openCardForm = (type, data, id) => () => {
        dialogRef.current.open();
        dialogHandler(
            <DynamicForm
                type={type}
                data={data}
                inPdfCallback={inPdfHandler(id)}
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
