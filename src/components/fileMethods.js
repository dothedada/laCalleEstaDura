// file methods
//
export const parseFile = (file) =>
    new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = () => resolve(fileReader);
        fileReader.onerror = (error) => reject(error);
        fileReader.readAsText(file, 'text/plain');
    });

export const arrangeItemsInFile = (from) => {
    return [...from].reduce(
        (arrange, item) => {
            arrange[/^CV|^[a-zA-Z]/.test(item) ? 'CVs' : 'cards'].add(item);
            return arrange;
        },
        { CVs: new Set(), cards: new Set() },
    );
};

export const newItems = (from, key) => {
    const comparedTo = Object.keys(localStorage);
    return [...from[key]].reduce(
        (acum, current) => {
            const isOnLs = comparedTo.includes(current) ? 1 : 0;
            acum[isOnLs].push(current);
            return acum;
        },
        [[], []],
    );
};

export const makeInventory = (dataOnFile) => {
    const fileInventory = arrangeItemsInFile(dataOnFile.map((card) => card.id));
    const [newCVs, duplicatedCVs] = newItems(fileInventory, 'CVs');
    const [newCards, duplicatedCards] = newItems(fileInventory, 'cards');
    const duplicatedItems = new Set([...duplicatedCards, ...duplicatedCVs]);

    return {
        cvsInFile: fileInventory.CVs.size,
        cardsInFile: fileInventory.cards.size,
        newCVs: newCVs.length,
        newCards: newCards.length,
        duplicatedCVs: duplicatedCVs.map((duplicatedCV) => {
            const cvsInLs = JSON.parse(localStorage.getItem(duplicatedCV));
            return cvsInLs.name;
        }),
        duplicatedCards: duplicatedCards.map((duplicatedCard) => {
            const cardInLs = JSON.parse(localStorage.getItem(duplicatedCard));
            return cardInLs.reference;
        }),
        duplicatedItems,
    };
};
