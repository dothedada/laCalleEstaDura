import { useRef, useState } from 'react';
// import { Experience } from '../js/card';
import { TextInput, Button, DataContainer } from './formComponents';
import { inputValidation } from './formValidations';

// TODO:
// Hacer de la barra inferior de botones un componente, integrar teclado
// revisar cómo pasa data, pues está siendo un objeto, lo que mata todas las bifurcaiones
// 4. revisar que la validación no se haga sobre el estado previo sino sobre el nuevo
// 5. creación del objedo de datos en memoria
// 5. botón de editar de la barra tambien sirve para guardar
// 6. implementación en otros tipos de tarjetas
// 7. creacion del modelo base
// 8. creación del pdf

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
        setDataToInject(data || {});
    };

    const refs = {
        place: useRef(),
        timeStart: useRef(),
        timeEnd: useRef(),
        titleEsp: useRef(),
        titleEng: useRef(),
        descriptionEsp: useRef(),
        descriptionEng: useRef(),
    };

    const handleSave = (event) => {
        event.preventDefault();

        // Validate data
        const wrongInputs = Object.values(refs).reduce((errors, ref) => {
            const inputWithError = ref.current.validate();
            if (inputWithError) errors.push(inputWithError);
            return errors;
        }, []);

        if (wrongInputs.length) {
            wrongInputs[0].focus();
            return;
        }

        // Save data

        console.log(dataToInject);
    };

    const handleLang = () => {
        setPreviewLang(previewLang === 'Esp' ? 'Eng' : 'Esp');
    };

    const inputReferenciation = (name) => {
        return {
            ref: refs[name],
            dataField: dataToInject[name],
            callback: updateData(name),
        };
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
                {...inputReferenciation('place')}
                label="¿Cómo se llamaba el lugar donde trabajaste?"
                placeholder="Acme Inc."
                validations={[inputValidation.notEmpty]}
            />

            <fieldset>
                <legend>¿Cuánto tiempo trabajaste allí?</legend>

                <TextInput
                    {...inputReferenciation('timeStart')}
                    label="mes de inicio"
                    placeholder="enero 2023"
                    validations={[
                        inputValidation.notEmpty,
                        inputValidation.isDate,
                    ]}
                />

                <TextInput
                    {...inputReferenciation('timeEnd')}
                    label="mes de terminación"
                    placeholder="enero 2024"
                    validations={[inputValidation.isDate]}
                />
            </fieldset>

            <fieldset>
                <legend>¿Cuál fue tu cargo?</legend>
                <TextInput
                    {...inputReferenciation('titleEsp')}
                    label="en español"
                    placeholder="Ingeniero de puentes y festivos"
                    validations={[inputValidation.notEmpty]}
                />

                <TextInput
                    {...inputReferenciation('titleEng')}
                    label="en inglés"
                    placeholder="Holidays engineer"
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

                <TextInput
                    {...inputReferenciation('descriptionEsp')}
                    oneLine={false}
                    label="en español"
                    placeholder="Describe los logros o tareas que llevaste a cabo"
                    height="5"
                    validations={[
                        inputValidation.notEmpty,
                        inputValidation.maxLength(350),
                    ]}
                />

                <TextInput
                    {...inputReferenciation('descriptionEng')}
                    oneLine={false}
                    label="en inglés"
                    placeholder="Describe your achievements or tasks performed "
                    height="5"
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
                    type="button"
                    callback={handleSave}
                />
            </div>

        </DataContainer>
    );
};

export default ExperienceForm;
