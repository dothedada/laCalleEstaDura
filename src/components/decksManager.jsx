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
    const [lang, setLang] = useState('Esp');
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

    const changeLang = () => {
        setLang((prvLang) => (prvLang === 'Esp' ? 'Eng' : 'Esp'));
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
                        <select name="cvs" id="cvs_selector">
                            <option>
                                Selecciona un modelo de hoja de vida
                            </option>
                            <option>carajo</option>
                            <option>pato</option>
                            <option>pendejo</option>
                            <option>culicagada</option>
                        </select>
                    </label>

                    <Button
                        type="reset"
                        text={lang === 'Esp' ? 'Español' : 'Inglés'}
                        callback={changeLang}
                    />
                    <Button type="reset" text="Ver" />
                    <Button type="button" text="PDF" />
                </div>

                <div className="cv-actions">
                    <Button type="warn" text="Borrar modelo" />
                    <Button type="reset" text="Añadir modelo" />
                    <Button type="reset" text="Actualizar modelo" />
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
                                lang={lang}
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
