import { useState } from 'react';
// import { Experience } from '../js/card';
import { TextInput, TextArea, Button, DataContainer } from './formComponents';
import { inputValidation } from './formValidations';
// NOTE: solucionar lo del textarea y el reset de la info

// TODO:
// 1.a hacer los regex de los campos
// 3. marcar campos complementarios
// 4. Manbejo de la exportación de la info validada como objeto de js
// 5. implementación en otros tipos de tarjetas

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
    };

    const handleSave = () => {
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
                label="Lugar de trabajo"
                placeholder="Acme Inc."
                dataField={dataToInject.place}
                callback={updateData('place')}
                validations={[inputValidation.notEmpty]}
            />

            <fieldset>
                <legend>Fecha</legend>

                <TextInput
                    label="de inicio"
                    placeholder="02-2022 ó febrero 2022"
                    dataField={dataToInject.timeStart}
                    callback={updateData('timeStart')}
                    validations={[
                        inputValidation.notEmpty,
                        inputValidation.isDate,
                    ]}
                />

                <TextInput
                    label="de finalización"
                    placeholder="12-2024 ó diciembre 2024"
                    dataField={dataToInject.timeEnd}
                    callback={updateData('timeEnd')}
                    validations={[inputValidation.isDate]}
                />
            </fieldset>

            <fieldset>
                <legend>Nombre del cargo</legend>
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
                />
            </fieldset>

            <fieldset>
                <legend>Cuáles son tus logros o tareas en este cargo</legend>

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
                    type="normal"
                    callback={handleSave}
                />
            </div>

            <hr />

            <fieldset className="preview">
                <legend>
                    Vista previa en{' '}
                    {previewLang === 'Esp' ? 'español' : 'inglés'}
                </legend>
                <ExperiencePreview data={dataToInject} lang={previewLang} />
                <button type="button" onPointerDown={handleLang}>
                    Cambiar idioma de la vista previa a{' '}
                    {previewLang !== 'Esp' ? 'español' : 'inglés'}
                </button>
            </fieldset>
        </DataContainer>
    );
};

export default ExperienceForm;
