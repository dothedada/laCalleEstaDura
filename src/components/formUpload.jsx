import { useState } from 'react';

const UploadFileSession = ({ text }) => {
    const [file, setFile] = useState();
    const [parsedData, setParsedData] = useState();
    const [loadStats, setLoadStats] = useState();

    const handleChange = (event) => {
        const loadFile = event.target.files[0];
        setFile(loadFile);
    };

    const parseFile = (file) =>
        new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.onload = () => resolve(fileReader);
            fileReader.onerror = (error) => reject(error);
            fileReader.readAsText(file, 'text/plain');
        });

    const loadData = async () => {
        const returnedData = await parseFile(file);
        const dataOnFile = JSON.parse(returnedData.result);
        const itemsOnLS = new Set(Object.keys(localStorage));
        const itemsOnFile = new Set(Object.keys(dataOnFile));
        let repeatedCards = 0;
        itemsOnFile.forEach((item) => {
            if (itemsOnLS.has(item)) repeatedCards++;
        });

        setLoadStats({
            newCards: itemsOnFile - repeatedCards,
            repeatedCards: reapetedCards,
        });
    };

    const saveData = () => {
        //
    };

    return (
        <div>
            <form action="">
                <label>
                    Selecciona {text} que quieres subir
                    <input type="file" onChange={handleChange} />
                </label>

                <button type="button" onClick={loadData}>
                    Cargar
                </button>
            </form>
        </div>
    );
};

export { UploadFileSession };
