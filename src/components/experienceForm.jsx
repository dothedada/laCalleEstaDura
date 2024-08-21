import { useState } from 'react';
import { TextInput, CheckBox } from './textInput';

function ExperienceForm() {
    const [count, setCount] = useState(0);

    return (
        <>
            <TextInput labelText="holi" />
            <CheckBox labelText="check" initialValue="true" />
            <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </button>
            </div>
        </>
    );
}

export default ExperienceForm;
