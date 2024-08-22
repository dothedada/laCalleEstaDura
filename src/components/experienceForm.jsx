import { useState } from 'react';
// import { Experience } from '../js/card';
import {
    TextInput,
    TextArea,
    RenderCard,
    Button,
    DataContainer,
} from './formComponents';

function ExperienceForm({ data }) {
    // const [unfold, setUnfold] = useState(false);
    const [dataToInject, setDataToInject] = useState(data ? data : {});

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

    return (
        <DataContainer
            name={
                !dataToInject.reference
                    ? 'Nueva experiencia laboral'
                    : dataToInject.reference
            }
            renderInPdf={true}
        >
            <TextInput
                label="Referencia para guardar la tarjeta"
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
            />

            <fieldset>
                <legend>Fecha</legend>

                <TextInput
                    label="de inicio"
                    placeholder="02-2022 ó febrero 2022"
                    dataField={dataToInject.timeStart}
                    callback={updateData('timeStart')}
                />

                <TextInput
                    label="de finalización"
                    placeholder="12-2024 ó diciembre 2024"
                    dataField={dataToInject.timeEnd}
                    callback={updateData('timeEnd')}
                />
            </fieldset>

            <fieldset>
                <legend>Nombre del cargo</legend>
                <TextInput
                    label="en español"
                    placeholder="Ingeniero de puentes y festivos"
                    dataField={dataToInject.titleEsp}
                    callback={updateData('titleEsp')}
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
                />

                <TextArea
                    label="en inglés"
                    placeholder="Describe your achievements or tasks performed "
                    height="5"
                    dataField={dataToInject.descriptionEsp}
                    callback={updateData('descriptionEsp')}
                />
            </fieldset>

            <Button
                text="Eliminar tarjeta"
                type="warn"
                callback={handleDelete}
            />

            <Button
                text="Deshacer cambios"
                text={!data ? 'Reiniciar' : 'Deshacer cambios'}
                type="reset"
                callback={handleReset}
            />

            <Button
                text={!data ? 'Guardar' : 'Actualizar'}
                type="normal"
                callback={handleSave}
            />
        </DataContainer>
    );
}

export default ExperienceForm;
