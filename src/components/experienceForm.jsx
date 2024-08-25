import { useRef, useState } from 'react';
// import { Experience } from '../js/card';
import { TextInput, FormButtons, DataContainer } from './formComponents';
import { inputValidation, uiText } from './txtAndValidations.js';

// TODO:
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
    const [startingData] = useState(data || undefined);
    const [dataToInject, setDataToInject] = useState(startingData ?? {});

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
            dataField: dataToInject[name],
            callback: updateData(name),
            label: uiText.experience.label[name],
            placeholder: uiText.experience.placeholder[name],
        };
    };

    const handleDelete = () => {
        console.log(dataToInject);
    };

    const handleReset = () => {
        setDataToInject(startingData || {});
    };

    const handleSave = () => {
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

        console.log(startingData);
        console.log(dataToInject);
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
