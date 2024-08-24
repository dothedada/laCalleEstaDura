import { useState } from 'react';
// import { Experience } from '../js/card';
import { TextInput, TextArea, Button, DataContainer } from './formComponents';
import { inputValidation } from './formValidations';

// TODO:
// 4. Manbejo de la exportación de la info validada como objeto de js
// 6. implementación en otros tipos de tarjetas

const ExperiencePreview = ({ data, lang }) => {
    return (
        <article>
            <header>
                <h3>
                    {data.place}
                    <span className="date">
                        <time dateTime="2012-03">{data.timeStart}</time>-
                        <time dateTime="2014-07">{data.timeEnd}</time>
                    </span>
                </h3>
                <div className="title">{data[`title${lang}`]}</div>
            </header>
            <p>{data[`description${lang}`]}</p>
        </article>
    );
};

const ExperienceForm = ({ data }) => {
    const [dataToInject, setDataToInject] = useState(data ? data : {});
    const [previewLang, setPreviewLang] = useState('Esp');

    const updateData = (key) => (value) => {
        setDataToInject((previousData) => ({
            ...previousData,
            [key]: value,
        }));
    };

    const handleDelete = () => {
        console.log(dataToInject);
    };

    const handleReset = () => {
        setDataToInject(data ? data : {});
        document.querySelectorAll('textarea').forEach((textarea) => {
            textarea.textContent = '';
        });
    };

    const handleSave = () => {
        if (
            !dataToInject.place ||
            !dataToInject.timeStart ||
            !dataToInject.titleEsp ||
            !dataToInject.descriptionEsp
        ) {
            alert('pailas');
        }
        console.log(document.querySelectorAll(':invalid'));
        console.log(dataToInject);
    };

    const handleLang = () => {
        setPreviewLang(previewLang === 'Esp' ? 'Eng' : 'Esp');
    };

    return (
        <DataContainer
            name={
                !dataToInject.reference
                    ? 'Nueva experiencia laboral'
                    : dataToInject.reference
            }
            render={!!data}
            preview={<ExperiencePreview data={dataToInject} lang="Esp" />}
        >
            <TextInput
                label="Nombre de la tarjeta"
                placeholder="Donde o qué hiciste"
                dataField={dataToInject.reference}
                callback={updateData('reference')}
            />
            <hr />

            <TextInput
                label="¿Cómo se llamaba el lugar donde trabajaste?"
                placeholder="Acme Inc."
                dataField={dataToInject.place}
                callback={updateData('place')}
                validations={[inputValidation.notEmpty]}
            />

            <fieldset>
                <legend>¿Cuánto tiempo trabajaste allí?</legend>

                <TextInput
                    label="mes de inicio"
                    placeholder="enero 2023"
                    dataField={dataToInject.timeStart}
                    callback={updateData('timeStart')}
                    validations={[
                        inputValidation.notEmpty,
                        inputValidation.isDate,
                    ]}
                />

                <TextInput
                    label="mes de terminación"
                    placeholder="enero 2024"
                    dataField={dataToInject.timeEnd}
                    callback={updateData('timeEnd')}
                    validations={[inputValidation.isDate]}
                />
            </fieldset>

            <fieldset>
                <legend>¿Cuál fue tu cargo?</legend>
                <TextInput
                    label="en español"
                    placeholder="Ingeniero de puentes y festivos"
                    dataField={dataToInject.titleEsp}
                    callback={updateData('titleEsp')}
                    validations={[inputValidation.notEmpty]}
                />

                <TextInput
                    label="en inglés"
                    placeholder="Holidays engineer"
                    dataField={dataToInject.titleEng}
                    callback={updateData('titleEng')}
                    sugestTranslation={
                        dataToInject.titleEsp && !dataToInject.titleEng
                    }
                />
            </fieldset>

            <fieldset>
                <legend>
                    ¿Cuáles fueron tus logros o qué tareas realizaste en este
                    cargo?
                </legend>

                <TextArea
                    label="en español"
                    placeholder="Describe los logros o tareas que llevaste a cabo"
                    height="5"
                    dataField={dataToInject.descriptionEsp}
                    callback={updateData('descriptionEsp')}
                    validations={[
                        inputValidation.notEmpty,
                        inputValidation.maxLength(350),
                    ]}
                />

                <TextArea
                    label="en inglés"
                    placeholder="Describe your achievements or tasks performed "
                    height="5"
                    dataField={dataToInject.descriptionEng}
                    callback={updateData('descriptionEng')}
                    validations={[inputValidation.maxLength(350)]}
                    sugestTranslation={
                        dataToInject.descriptionEsp &&
                        !dataToInject.descriptionEng
                    }
                />
            </fieldset>

            <div className="card__buttons">
                <Button
                    text="Eliminar tarjeta"
                    type="warn"
                    callback={handleDelete}
                />

                <Button
                    text={!data ? 'Reiniciar' : 'Deshacer cambios'}
                    type="reset"
                    callback={handleReset}
                />

                <Button
                    text={!data ? 'Guardar' : 'Actualizar'}
                    type="submit"
                    callback={handleSave}
                />
            </div>

            <hr />

            <fieldset className="preview">
                <legend>
                    Vista previa en
                    {previewLang === 'Esp' ? ' español' : ' inglés'}
                </legend>
                <ExperiencePreview data={dataToInject} lang={previewLang} />
                <button type="button" onPointerDown={handleLang}>
                    Cambiar el idioma de la vista previa a
                    {previewLang !== 'Esp' ? ' español' : ' inglés'}
                </button>
            </fieldset>
        </DataContainer>
    );
};

export default ExperienceForm;
