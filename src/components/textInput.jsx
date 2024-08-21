import { useState } from 'react';

const TextInput = ({ labelText, initialValue = '' }) => {
    const [inputValue, setInputValue] = useState(initialValue);

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    return (
        <label>
            {labelText}
            <input type="text" value={inputValue} onChange={handleChange} />
            {inputValue}
        </label>
    );
};

const CheckBox = ({ labelText, initialValue = false }) => {
    const [check, setCheck] = useState(initialValue);

    const handleChange = () => {
        setCheck(!check);
    };

    return (
        <label>
            {labelText}
            <input type="checkbox" checked={check} onChange={handleChange} />
            {`${check}`}
        </label>
    );
};

export { TextInput, CheckBox };
