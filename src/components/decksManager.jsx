import { useRef, useState } from 'react';

import { Dialog } from './formComponents';
import { Globals } from './globals';
import { DeckMenu } from './decksMenu';
import CardsGroup from './decksCardsGroups';
import { Preview } from './preview';
import { cardTypesInOrder } from './txtAndValidations';
import { UploadFileSession } from './formUpload';

const DeckManager = ({ deck }) => {
    const [renderInPdf, setRenderInPdf] = useState(new Set());
    const [lang, setLang] = useState('Esp');

    // al agregar o eliminar tarjeta, modificar storecards para forzar rerender
    const [storedCards, setStoredCards] = useState(deck.cardsGroups);

    const dialogComp = useRef(null);
    const [dialogData, setDialogData] = useState(null);

    const changeLang = () => {
        setLang((prvLang) => (prvLang === 'Esp' ? 'Eng' : 'Esp'));
    };

    const inPdfHandler = (id) => () => {
        setRenderInPdf((prvRender) => {
            const newRender = new Set(prvRender);

            renderInPdf.has(id) ? newRender.delete(id) : newRender.add(id);

            return newRender;
        });
    };

    const previewHandler = () => {
        dialogComp.current.open();
        setDialogData(
            <Preview
                deck={deck.cardsGroups}
                renderInPdf={renderInPdf}
                lang={lang}
            />,
        );
    };

    const exportHandler = () => {
        const filename = `myCVcards_${new Date().getFullYear()}${new Date().getMonth() + 1}${new Date().getDate()}.txt`;

        // la parte para comprimir
        const cardsIdsOnLS = Object.keys(localStorage);
        const cardsOnLs = cardsIdsOnLS.map((cardId) =>
            JSON.parse(localStorage.getItem(cardId)),
        );
        const cardsInString = new Blob([JSON.stringify(cardsOnLs)], {
            type: 'text/plain',
        });

        const cardsUrl = URL.createObjectURL(cardsInString);
        const virtualLink = document.createElement('a');
        virtualLink.href = cardsUrl;
        virtualLink.download = filename;
        virtualLink.click();
        URL.revokeObjectURL(cardsUrl);
    };

    const importHandler = () => {
        dialogComp.current.open();
        setDialogData(<UploadFileSession fileType="cards" />);
    };

    return (
        <div className="decks">
            <div className="cv-selector">
                <Globals
                    viewCallback={renderInPdf.size ? previewHandler : undefined}
                    downloadCallback={
                        renderInPdf.size ? previewHandler : undefined
                    }
                    exportCallback={exportHandler}
                    importCallback={importHandler}
                />

                <DeckMenu
                    data={deck}
                    cardsInPdfCallback={setRenderInPdf}
                    lang={lang}
                    langCallback={changeLang}
                    dialogRef={dialogComp}
                    dialogHandler={setDialogData}
                />
            </div>

            {cardTypesInOrder.map((cardType) => (
                <CardsGroup
                    cards={storedCards[cardType]}
                    cardsManager={{
                        storedCards: storedCards[cardType],
                        setStoredCards,
                        dialogRef: dialogComp,
                        dialogHandler: setDialogData,
                    }}
                    deckType={cardType}
                    lang={lang}
                    renderInPdf={renderInPdf}
                    inPdfHandler={inPdfHandler}
                    dialogRef={dialogComp}
                    dialogHandler={setDialogData}
                    key={cardType}
                />
            ))}

            <Dialog ref={dialogComp} dialogSetter={setDialogData}>
                {dialogData}
            </Dialog>
        </div>
    );
};

export { DeckManager };
