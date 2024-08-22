import { useState } from 'react';

const TextInput = ({ label, placeholder, initialState = '' }) => {
    const [inputValue, setInputValue] = useState(initialState);

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    return (
        <label>
            {label}
            <input
                type="text"
                placeholder={placeholder}
                value={inputValue}
                onChange={handleChange}
            />
            <p>{inputValue}</p>
        </label>
    );
};

const TextArea = ({ label, placeholder, initialState = '', height = '5' }) => {
    const [inputValue, setInputValue] = useState(initialState);

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    return (
        <label>
            {label}
            <textarea
                type="text"
                rows={height}
                placeholder={placeholder}
                value={inputValue}
                onChange={handleChange}
            ></textarea>
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
            <input
                type="checkbox"
                checked={visible}
                onChange={handleChange}
                className="hidden"
            />
        </label>
    );
};

export { TextInput, TextArea, RenderCard };
