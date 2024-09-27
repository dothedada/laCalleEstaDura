// file methods
//
export const parseFile = (file) =>
    new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = () => resolve(fileReader);
        fileReader.onerror = (error) => reject(error);
        fileReader.readAsText(file, 'text/plain');
    });

export const makeInventory = (from) => {
    return [...from].reduce(
        (arrange, item) => {
            arrange[/^CV|^[a-zA-Z]/.test(item) ? 'CVs' : 'cards'].add(item);
            return arrange;
        },
        { CVs: new Set(), cards: new Set() },
    );
};

export const newItems = (from, comparedTo, key) => {
    return [...from[key]].reduce(
        (acum, current) => {
            const isOnLs = comparedTo[key].has(current) ? 1 : 0;
            acum[isOnLs].push(current);
            return acum;
        },
        [[], []],
    );
};

export const inventory = (dataOnFile, lsInventory) => {
    const fileInventory = makeInventory(dataOnFile.map((card) => card.id));
    const [newCVs, duplicatedCVs] = newItems(fileInventory, lsInventory, 'CVs');
    const [newCards, duplicatedCards] = newItems(
        fileInventory,
        lsInventory,
        'cards',
    );

    return {
        cvsInFile: fileInventory.CVs.size,
        cardsInFile: fileInventory.cards.size,
        newCVs: newCVs.length,
        newCards: newCards.length,
        duplicatedCVs: duplicatedCVs.map(
            (duplicatedCV) => localStorage.getItem(duplicatedCV).name,
        ),
        duplicatedCards: duplicatedCards.map((duplicatedCard) => {
            const cardInLs = JSON.parse(localStorage.getItem(duplicatedCard));
            const cardInFile = dataOnFile.find(
                (card) => card.id === duplicatedCard,
            );
            return [cardInLs.reference, cardInFile.reference];
        }),
    };
};
