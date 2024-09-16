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
    const formDialog = useRef(null);
    const [formFields, setFormFields] = useState(null);

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
        formDialog.current.close();
        setFormFields(null);
    };

    const openForm = (type, data, id) => () => {
        formDialog.current.showModal();
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
        <div className="decks">
            <div className="cv-selector">
                <div className="cv-globals">
                    <Button type="reset" text="exportar" />
                    <Button type="reset" text="importar" />
                </div>

                <div className="cv-picker">
                    <label>
                        Selecciona un modelo de hoja de vida
                        <select name="cvs" id="cvs_selector">
                            <option>---</option>
                            <option>carajo</option>
                            <option>pato</option>
                            <option>pendejo</option>
                            <option>culicagada</option>
                        </select>
                    </label>

                    <Button type="reset" text="Español" />
                    <Button type="reset" text="Ver" />
                    <Button type="button" text="PDF" />
                </div>

                <div className="cv-actions">
                    <Button type="warn" text="Eliminar" />
                    <Button type="reset" text="Añadir" />
                    <Button type="reset" text="Actualizar" />
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
                </div>
            ))}

            <dialog ref={formDialog}>{formFields}</dialog>
        </div>
    );
};

export { DeckManager };
