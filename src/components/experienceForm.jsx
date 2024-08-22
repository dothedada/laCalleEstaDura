import { useState } from 'react';
import {
    TextInput,
    TextArea,
    RenderCard,
    Button,
    DataContainer,
} from './formComponents';

function ExperienceForm({ data }) {
    const [open, setOpen] = useState(false);
    const dataToInject = !data
        ? {
              reference: '',
              name: '',
              place: '',
              titleEsp: '',
              titleEng: '',
              timeStart: '',
              timeEnd: '',
              descriptionEsp: '',
              descriptionEng: '',
          }
        : data;

    const handleReset = () => {
        for (let field in dataToInject) {
            dataToInject[field] = '';
        }
    };
    const handleClick = (event) => {
        console.log(dataToInject);
    };

    return (
        <DataContainer name="test">
            <p>Ingresa la información sobre esta experiencia laboral</p>
            <TextInput
                label="Referencia con la que deseas guardarla"
                initialState=""
            />
            <hr />
            <TextInput label="Lugar de trabajo" initialState="asd" />
            <RenderCard label="check" initialState={true} />
            <Button text="reset" type="reset" callback={handleReset} />
            <Button text="delete" type="warn" callback={handleClick} />
            <Button text="carajo" type="normal" callback={handleClick} />
            <TextArea label="area" initialState="nanai" height="10" />
        </DataContainer>
    );
}

export default ExperienceForm;
