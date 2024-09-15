import { useRef, useState } from 'react';

import { DynamicCard, DynamicForm } from './decksGenerator';
import { uiText } from './txtAndValidations';
import { Button } from './formComponents';

const cardGroups = [
    'profile',
    'bio',
    'experience',
    'skills',
    'education',
    'references',
];

const DeckManager = ({ cards }) => {
    const [storedCards, setStoredCards] = useState(cards);
    const [renderInPdf, setRenderInPdf] = useState(new Set());
    const formRef = useRef(null);
    const [formFields, setFormFields] = useState();

    const inPdfHandler = (id) => () => {
        setRenderInPdf((prvRender) => {
            const newRender = new Set(prvRender);

            if (renderInPdf.has(id)) {
                newRender.delete(id);
            } else {
                newRender.add(id);
            }

            return newRender;
        });
    };

    const addToPdf = (id) => () => {
        setRenderInPdf((prvRender) => {
            const newRender = new Set(prvRender);
            newRender.add(id);
            return newRender;
        });
    };

    const closeForm = () => {
        formRef.current.close();
    };

    const openForm = (type, data, id) => () => {
        formRef.current.showModal();
        setFormFields(
            <>
                <Button callback={closeForm} type="warn" text="cerrar" />
                <DynamicForm
                    type={type}
                    data={data}
                    inPdfCallback={addToPdf(id)}
                />
            </>,
        );
    };

    return (
        <div className="frame decks">
            <div className="cv-selector">
                <select name="cvs" id="cvs_selector">
                    <option>carajo</option>
                </select>

                <div className="cv-actions">
                    <button type="button">Añadir</button>
                    <button type="button">Actualizar</button>
                    <button type="button">Eliminar</button>
                </div>
            </div>

            {cardGroups.map((deckType, index) => (
                <div key={index}>
                    <div>
                        <h2>{uiText.global.sections.Esp[deckType]}</h2>

                        {storedCards?.[deckType]?.map((card) => (
                            <DynamicCard
                                type={card.type}
                                key={card.id}
                                data={card}
                                lang="Esp"
                                inPdf={renderInPdf.has(card.id)}
                                inPdfCallback={inPdfHandler(card.id)}
                            />
                        ))}

                        {deckType !== 'skills' ? (
                            <Button
                                type="button"
                                text={uiText[deckType].reference}
                                callback={openForm(deckType)}
                            />
                        ) : (
                            <>
                                <Button
                                    type="button"
                                    text={uiText.skillsList.reference}
                                    callback={openForm('skillsList')}
                                />
                                <Button
                                    type="button"
                                    text={uiText.skillsText.reference}
                                    callback={openForm('skillsText')}
                                />
                            </>
                        )}
                    </div>
                    <dialog ref={formRef}>{formFields}</dialog>
                </div>
            ))}

            <div className="cv-actions">
                <button type="button">Añadir</button>
                <button type="button">Actualizar</button>
                <button type="button">Eliminar</button>
            </div>
        </div>
    );
};

export { DeckManager };
