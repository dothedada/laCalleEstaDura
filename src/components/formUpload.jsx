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

    return (
        <div>
            <form action="">
                <label>
                    {uiText.global.dialog.upload[fileType].label}
                    <input type="file" onChange={handleChange} />
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
                        />
                        <Button
                            text={uiText.global.dialog.upload.cards.importAll}
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
