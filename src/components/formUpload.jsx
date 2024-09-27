import { useState } from 'react';
import { parseFile, makeInventory } from './fileMethods';

const UploadFileSession = ({ text }) => {
    const [uploadedFile, setUploadedFile] = useState(null);
    const [parsedData, setParsedData] = useState();
    const [loadStats, setLoadStats] = useState(null);

    const handleChange = (event) => {
        const loadFile = event.target.files[0];
        setUploadedFile(loadFile);
    };

    const loadData = async () => {
        if (!uploadedFile) return;
        try {
            const returnedData = await parseFile(uploadedFile);
            const dataOnFile = JSON.parse(returnedData.result);
            const lsInventory = Object.keys(localStorage);

            setLoadStats(makeInventory(dataOnFile, lsInventory));
        } catch (err) {
            setLoadStats();
            console.log('error en la lectura del archivo: ', err);
        }
    };

    return (
        <div>
            <form action="">
                <label>
                    Selecciona {text} que quieres subir
                    <input type="file" onChange={handleChange} />
                </label>

                {uploadedFile && (
                    <button type="button" onClick={loadData}>
                        Cargar
                    </button>
                )}

                {loadStats && (
                    <div>
                        <div>
                            En el archivo hay {loadStats.cvsInFile} estructura
                            {loadStats.cvsInFile > 1 ? 's ' : ' '}
                            de hoja de vida
                            {loadStats.duplicatedCVs.length
                                ? `, donde ${loadStats.duplicatedCVs.length} ya se encuentran en el dispositivo`
                                : ` nueva${loadStats.duplicatedCVs.length > 1 ? 's' : ''}.`}
                        </div>
                        <div>
                            En el archivo hay {loadStats.cardsInFile} tarjeta
                            {loadStats.cardsInFile > 1 ? 's ' : ' '}
                            {loadStats.duplicatedCards.length
                                ? `, donde ${loadStats.duplicatedCards.length} ya se encuentran en el dispositivo`
                                : ` nueva${loadStats.duplicatedCards.length > 1 ? 's' : ''}.`}
                        </div>
                    </div>
                )}
            </form>
        </div>
    );
};

export { UploadFileSession };
