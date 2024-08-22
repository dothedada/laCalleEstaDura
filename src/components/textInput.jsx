import { useState } from 'react';

const IconEye = ({ open }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 256 256"
            aria-hidden="true"
        >
            <path
                fill="currentColor"
                d={
                    open
                        ? 'M247.31 124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57 61.26 162.88 48 128 48S61.43 61.26 36.34 86.35C17.51 105.18 9 124 8.69 124.76a8 8 0 0 0 0 6.5c.35.79 8.82 19.57 27.65 38.4C61.43 194.74 93.12 208 128 208s66.57-13.26 91.66-38.34c18.83-18.83 27.3-37.61 27.65-38.4a8 8 0 0 0 0-6.5M128 192c-30.78 0-57.67-11.19-79.93-33.25A133.5 133.5 0 0 1 25 128a133.3 133.3 0 0 1 23.07-30.75C70.33 75.19 97.22 64 128 64s57.67 11.19 79.93 33.25A133.5 133.5 0 0 1 231.05 128c-7.21 13.46-38.62 64-103.05 64m0-112a48 48 0 1 0 48 48a48.05 48.05 0 0 0-48-48m0 80a32 32 0 1 1 32-32a32 32 0 0 1-32 32'
                        : 'M234.42 162a12 12 0 1 1-20.84 12l-16.86-29.5a127.2 127.2 0 0 1-30.17 13.86l5.29 31.64a12 12 0 0 1-9.87 13.8a11 11 0 0 1-2 .17a12 12 0 0 1-11.82-10l-5.15-30.8a136.5 136.5 0 0 1-30.06 0l-5.1 30.83A12 12 0 0 1 96 204a11 11 0 0 1-2-.17A12 12 0 0 1 84.16 190l5.29-31.72a127.2 127.2 0 0 1-30.17-13.86L42.42 174a12 12 0 1 1-20.84-12L40 129.85a160 160 0 0 1-17.31-18.31a12 12 0 0 1 18.65-15.08C57.38 116.32 85.44 140 128 140s70.62-23.68 86.66-43.54a12 12 0 0 1 18.67 15.08A160 160 0 0 1 216 129.85Z'
                }
            ></path>
        </svg>
    );
};

const TextInput = ({ label, placeholder = '', initialState = '' }) => {
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

const TextArea = ({
    label,
    placeholder = '',
    initialState = '',
    height = '5',
}) => {
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

const RenderCard = ({ initialState = false }) => {
    const [visible, setVisible] = useState(initialState);

    const handleChange = () => {
        setVisible(!visible);
    };

    const handleKeyDown = (event) => {
        if (event.key !== ' ' && event.key !== 'Enter') return;

        event.preventDefault();
        setVisible(!visible);
    };

    return (
        <label tabIndex="0" onKeyDown={handleKeyDown}>
            <span className="sr-only">
                Este elemento {visible ? 'se' : 'no se'} encuentra en la hoja de
                vida actual, haz clic para cambiar el estado.
            </span>
            <IconEye open={visible} />
            <input
                type="checkbox"
                className='hidden'
                onChange={handleChange}
                checked={visible}
            />
        </label>
    );
};

export { TextInput, TextArea, RenderCard };
