import { useState } from 'react';
import { TextInput, TextArea, RenderCard, Button } from './formComponents';

function ExperienceForm() {
    const [count, setCount] = useState(0);

    const handleClick = (event) => {
        console.log(event.target);
    };

    return (
        <>
            <TextInput label="holi" initialState="asd" />
            <RenderCard label="check" initialState={true} />
            <Button text="reset" type="reset" callback={handleClick} />
            <Button text="delete" type="warn" callback={handleClick} />
            <Button text="carajo" type="normal" callback={handleClick} />
            <hr />
            <TextArea label="area" initialState="nanai" height="10" />
            <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </button>
            </div>
        </>
    );
}

export default ExperienceForm;
