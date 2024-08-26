import { useRef, useState } from 'react';

import { Experience } from '../js/card';
import { TextInput, FormButtons, DataContainer } from './formComponents';
import { inputValidation, months, uiText } from './txtAndValidations.js';
import { ExperiencePreview } from './previewCards.jsx';

// TODO:
// 5.a previews, manejo de fechas al cargar, no permitir fecha de inicio mayor a finalizacion
// 5. creación del objedo de datos en memoria
// 5. CRUD de tarjetas (Actualizar sin cambiar ID, feedback de acciones, actualización interfase, nuevo objeto)
// 5. botón de editar de la barra tambien sirve para guardar
// 6. implementación en otros tipos de tarjetas
// 7. creacion del modelo base
// 8. creación del pdf

const ExperienceForm = ({ data }) => {
    const [startingData] = useState(data || undefined);
    const [dataToInject, setDataToInject] = useState(startingData ?? {});

    console.log('info de la tarjeta:', data)
    const updateData = (key) => (value) => {
        setDataToInject((previousData) => ({
            ...previousData,
            [key]: value,
        }));
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

    const propGenerator = (name) => {
        return {
            ref: refs[name],
            dataField:
                dataToInject[name] instanceof Date
                    ? `${months[dataToInject[name].getMonth()]} ${dataToInject[name].getFullYear()}`
                    : dataToInject[name],
            callback: updateData(name),
            label: uiText.experience.label[name],
            placeholder: uiText.experience.placeholder[name],
        };
    };

    const handleDelete = () => {
        if (!startingData) return;
        localStorage.removeItem(startingData.id);
    };

    const handleReset = () => {
        setDataToInject(startingData || {});
    };

    const handleSave = () => {
        const wrongInputs = Object.values(refs).reduce((errors, ref) => {
            const inputWithError = ref.current.validate();
            if (inputWithError) errors.push(inputWithError);
            return errors;
        }, []);

        if (wrongInputs.length) {
            wrongInputs[0].focus();
            return;
        }

        dataToInject.reference = dataToInject.reference ?? undefined;
        const newExperience = new Experience(dataToInject);

        localStorage.setItem(newExperience.id, JSON.stringify(newExperience));
    };

    return (
        <DataContainer
            name={
                !dataToInject.reference
                    ? uiText.experience.reference
                    : dataToInject.reference
            }
            render={!!startingData}
            preview={<ExperiencePreview data={dataToInject} lang="Esp" />}
        >
            <TextInput {...propGenerator('reference')} ref={null} />
            <hr />

            <TextInput
                {...propGenerator('place')}
                validations={[inputValidation.notEmpty]}
            />

            <fieldset>
                <legend>{uiText.experience.legend.date}</legend>

                <TextInput
                    {...propGenerator('timeStart')}
                    validations={[
                        inputValidation.notEmpty,
                        inputValidation.isDate,
                    ]}
                />

                <TextInput
                    {...propGenerator('timeEnd')}
                    validations={[inputValidation.isDate]}
                />
            </fieldset>

            <fieldset>
                <legend>{uiText.experience.legend.title}</legend>
                <TextInput
                    {...propGenerator('titleEsp')}
                    validations={[inputValidation.notEmpty]}
                />

                <TextInput
                    {...propGenerator('titleEng')}
                    sugestTranslation={
                        dataToInject.titleEsp && !dataToInject.titleEng
                    }
                />
            </fieldset>

            <fieldset>
                <legend>{uiText.experience.legend.description}</legend>

                <TextInput
                    {...propGenerator('descriptionEsp')}
                    oneLine={false}
                    height="5"
                    validations={[
                        inputValidation.notEmpty,
                        inputValidation.maxLength(350),
                    ]}
                />

                <TextInput
                    {...propGenerator('descriptionEng')}
                    oneLine={false}
                    height="5"
                    validations={[inputValidation.maxLength(350)]}
                    sugestTranslation={
                        dataToInject.descriptionEsp &&
                        !dataToInject.descriptionEng
                    }
                />
            </fieldset>

            <FormButtons
                previousData={startingData}
                deleteCallback={handleDelete}
                resetCallback={handleReset}
                saveCallback={handleSave}
            />
        </DataContainer>
    );
};

export default ExperienceForm;
