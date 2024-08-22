import { useState } from 'react';

const TextInput = ({ label, initialState = '' }) => {
    const [inputValue, setInputValue] = useState(initialState);

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    return (
        <label>
            {label}
            <input type="text" value={inputValue} onChange={handleChange} />
            <p>{inputValue}</p>
        </label>
    );
};

const TextArea = ({ labelText, initialState = '' }) => {
    const [inputValue, setInputValue] = useState(initialState);

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    return (
        <label>
            {labelText}
            <input type="text" value={inputValue} onChange={handleChange} />
            <p>{inputValue}</p>
        </label>
    );
};

const RenderCard = ({ label, initialState = false }) => {
    const [visible, setVisible] = useState(initialState);

    const handleChange = () => {
        setVisible(!visible);
    };

    return (
        <label>
            {label} {visible ? 'Visible' : 'Hidden'}
            <input type="checkbox" checked={visible} onChange={handleChange} hidden/>
        </label>
    );
};

export { TextInput, TextArea, RenderCard };
