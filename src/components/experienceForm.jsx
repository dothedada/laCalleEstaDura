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
        >
            <RenderCard label="check" initialState={true} />

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

            <TextInput
                label="Fecha de inicio"
                placeholder="02-2022 ó febrero 2022"
                dataField={dataToInject.timeStart}
                callback={updateData('timeStart')}
            />

            <TextInput
                label="Fecha de finalización, deja vacío si todavía trabajas aquí"
                placeholder="12-2024 ó diciembre 2024"
                dataField={dataToInject.timeEnd}
                callback={updateData('timeEnd')}
            />

            <TextInput
                label="Nombre del cargo (ESPAÑOL)"
                placeholder="Ingeniero de puentes y festivos"
                dataField={dataToInject.titleEsp}
                callback={updateData('titleEsp')}
            />

            <TextInput
                label="Nombre del cargo (INGLÉS)"
                placeholder="Holidays engineer"
                dataField={dataToInject.titleEng}
                callback={updateData('titleEng')}
            />

            <TextArea
                label="Descripción de tu cargo (ESPAÑOL)"
                placeholder="Describe los logros o tareas que llevaste a cabo"
                height="5"
                dataField={dataToInject.descriptionEsp}
                callback={updateData('descriptionEsp')}
            />

            <TextArea
                label="Descripción de tu cargo (INGLÉS)"
                placeholder="Describe your achievements or tasks performed "
                height="5"
                dataField={dataToInject.descriptionEsp}
                callback={updateData('descriptionEsp')}
            />

            <Button
                text="Eliminar tarjeta"
                type="warn"
                callback={handleDelete}
            />

            <Button
                text="Deshacer cambios"
                type="reset"
                callback={handleReset}
            />

            <Button text="Guardar" type="normal" callback={handleSave} />

            <div>
                <h4>vista previa</h4>
            </div>
        </DataContainer>
    );
}

export default ExperienceForm;
