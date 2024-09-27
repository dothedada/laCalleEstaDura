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

        const makeInventory = (from) => {
            return [...from].reduce(
                (arrange, item) => {
                    arrange[/^CV|^[a-zA-Z]/.test(item) ? 'CVs' : 'cards'].add(
                        item,
                    );
                    return arrange;
                },
                { CVs: new Set(), cards: new Set() },
            );
        };

        const newItems = (from, comparedTo, key) => {
            return [...from[key]].reduce(
                (acum, current) => {
                    const isOnLs = comparedTo[key].has(current) ? 1 : 0;
                    acum[isOnLs].push(current);
                    return acum;
                },
                [[], []],
            );
        };

        const lsInventory = makeInventory(Object.keys(localStorage));
        const fileInventory = makeInventory(dataOnFile.map((card) => card.id));
        const [newCVs, duplicatedCVs] = newItems(
            fileInventory,
            lsInventory,
            'CVs',
        );
        const [newCards, duplicatedCards] = newItems(
            fileInventory,
            lsInventory,
            'cards',
        );

        const inventory = {
            cvsInFile: fileInventory.CVs.size,
            cardsInFile: fileInventory.cards.size,
            newCVs: newCVs.length,
            newCards: newCards.length,
            duplicatedCVs: duplicatedCVs.map(
                (duplicatedCV) => localStorage.getItem(duplicatedCV).name,
            ),
            duplicatedCards: duplicatedCards.map((duplicatedCard) => {
                const cardInLs = JSON.parse(
                    localStorage.getItem(duplicatedCard),
                );
                const cardInFile = dataOnFile.find(
                    (card) => card.id === duplicatedCard,
                );
                return [cardInLs.reference, cardInFile.reference];
            }),
        };
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
