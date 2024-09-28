import { useState } from 'react';
import { parseFile, makeInventory } from './fileMethods';
import { uiText } from './txtAndValidations';
import { Button } from './formComponents';
import PreviewCardsUpload from './previewUpload';

const UploadFileSession = ({ fileType }) => {
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

            setParsedData(dataOnFile);
            setLoadStats(makeInventory(dataOnFile));
        } catch (err) {
            setLoadStats();
            throw Error('error en la lectura del archivo: ', err);
        }
    };

    const importNew = () => {
        parsedData.forEach((card) => {
            if (!loadStats.duplicatedItems.has(card.id)) {
                localStorage.setItem(card.id, JSON.stringify(card));
            }
        });
        location.reload();
    };

    const importAll = () => {
        parsedData.forEach((card) => {
            localStorage.setItem(card.id, JSON.stringify(card));
        });
        location.reload();
    };

    return (
        <div>
            <form action="">
                <label>
                    {uiText.global.dialog.upload[fileType].label}
                    <input type="file" accept=".txt" onChange={handleChange} />
                </label>

                {uploadedFile && (
                    <Button
                        type="button"
                        text={uiText.global.dialog.upload.cards.parse}
                        callback={loadData}
                    />
                )}

                {loadStats && (
                    <>
                        <PreviewCardsUpload stats={loadStats} />
                        <Button
                            text={uiText.global.dialog.upload.cards.importNew}
                            callback={importNew}
                            type="button"
                        />
                        <Button
                            text={uiText.global.dialog.upload.cards.importAll}
                            callback={importAll}
                            type="button"
                        />
                        <Button
                            text={uiText.global.dialog.upload.cards.cancel}
                        />
                    </>
                )}
            </form>
        </div>
    );
};

export { UploadFileSession };
