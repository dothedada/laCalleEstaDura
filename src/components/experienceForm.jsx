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
    const [dataToInject, setDataToInject] = useState(
        !data
            ? {
                  reference: '123',
                  name: '',
                  place: '',
                  titleEsp: '',
                  titleEng: '',
                  timeStart: '',
                  timeEnd: '',
                  descriptionEsp: '',
                  descriptionEng: '',
              }
            : data,
    );

    const updateData = (key) => (value) => {
        setDataToInject((previousData) => ({
            ...previousData,
            [key]: value,
        }));
    };

    // const handleReset = () => {
    //     for (let field in dataToInject) {
    //         dataToInject[field] = '';
    //     }
    // };
    const handleClick = () => {
        console.log(dataToInject);
    };

    // <Button text="reset" type="reset" callback={handleReset} />
    return (
        <DataContainer name="test">
            <p>Ingresa la información sobre esta experiencia laboral</p>
            <TextInput
                label="Referencia para guardar la tarjeta"
                dataField={dataToInject.reference}
                callback={updateData('reference')}
                placeholder='Donde o qué hiciste'
            />
            <hr />
            <RenderCard label="check" initialState={true} />
            <Button text="delete" type="warn" callback={handleClick} />
            <Button text="carajo" type="normal" callback={handleClick} />
            <TextArea label="area" initialState="nanai" height="10" />
        </DataContainer>
    );
}

export default ExperienceForm;
