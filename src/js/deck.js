import cardClass from './card';

export class Deck {
    constructor() {
        const inLS = this.loadLS();

        this.subDecks = inLS.cards.reduce(
            (deck, card) => this.addCardToDeck(deck, card),
            {},
        );
        // sets = [{id: '', name: '', lang: '', cardsIds: []}]
        this.sets = inLS.sets;
    }

    loadLS() {
        return Object.keys(localStorage).reduce(
            (items, key) => {
                const item = JSON.parse(localStorage.getItem(key));
                // if (!/LCED/g.test(item.id)) return items;

                const { type } = item;
                (type ? items.cards : items.sets).push(item);

                return items;
            },
            { cards: [], sets: [] },
        );
    }

    #getDeckType(type) {
        return /^skills/.test(type) ? 'skills' : type;
    }

    addCardToDeck(deck, card) {
        if (!card.type) {
            return deck;
        }
        const deckType = this.#getDeckType(card.type);
        deck[deckType] = deck[deckType] || [];
        deck[deckType].push(new cardClass[card.type](card));

        return deck;
    }

    removeFromSetsAndDecks({ id, type }) {
        this.sets.forEach((set) => {
            const cardIdIndex = set.cardsIds.indexOf((cardId) => cardId === id);

            if (cardIdIndex > 0) {
                set.cardsIds.splice(cardIdIndex, 1);
            }
        });

        const deckType = this.#getDeckType(type);
        const indexOfCard = this.subDecks[deckType].indexOf(
            (card) => card.id === id,
        );
        this.subDecks[deckType].splice(indexOfCard, 1);
    }

    updateCardOnDeck({ id, type }) {
        const deckType = this.#getDeckType(type);
        const indexOfCard = this.subDecks[deckType].indexOf(
            (card) => card.id === id,
        );
        const updatedCard = new cardClass[deckType](localStorage.getItem(id));

        this.subDecks[deckType].splice(indexOfCard, 1, updatedCard);
    }

    #generateId(setName) {
        const sanitizedName = `${setName}`.replace(/[^a-z0-9_]/gi, '');
        const randomHex = Math.floor(Math.random() * 1000000).toString(16);
        const timeSignature = Number(new Date().getTime()).toString(16);

        return `${sanitizedName}_${randomHex}_${timeSignature}`;
    }

    getCardsOfSet(setId) {
        return this.sets.find((set) => set.id === setId).cardsIds;
    }

    createNewSet(setName, setLang) {
        const id = this.#generateId(setName);
        const name = setName;
        const lang = setLang;
        const cardsIds = Array.from(
            document.querySelectorAll('[data-inpdf="true"]'),
        ).map((element) => element.getAttribute('data-id'));

        const newSet = { id, name, cardsIds, lang };

        localStorage.setItem(id, JSON.stringify(newSet));
        return newSet
    }

    updateSet(setId, lang) {
        const setToUpdate = this.sets.find((set) => set.id === setId);
        const cardsIds = document
            .querySelectorAll('[data-inpdf="true"]')
            .forEach((element) => element.getAttribute('data-id'));

        setToUpdate.cardsIds = cardsIds;
        setToUpdate.lang = lang;

        return setToUpdate
    }

    removeSet(setId) {
        const indexOfSetToRemove = this.sets((set) => set.id === setId);
        this.sets.splice(indexOfSetToRemove, 1);
    }
}
