import cardClass from './card';

export class Deck {
    constructor() {
        const inLS = this.loadLS();

        this.cardsGroups = inLS.cards.reduce(
            (deck, card) => this.addCardToDeck(deck, card),
            {},
        );
        // sets = [{id: '', name: '', lang: '', cardsIds: []}]
        this.decks = inLS.decks;
    }

    loadLS() {
        return Object.keys(localStorage).reduce(
            (items, key) => {
                const item = JSON.parse(localStorage.getItem(key));
                // if (!/LCED/g.test(item.id)) return items;

                const { type } = item;
                (type ? items.cards : items.decks).push(item);

                return items;
            },
            { cards: [], decks: [] },
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
        this.decks.forEach((deck) => {
            const cardIdIndex = deck.cardsIds.indexOf(
                (cardId) => cardId === id,
            );

            if (cardIdIndex > 0) {
                deck.cardsIds.splice(cardIdIndex, 1);
            }
        });

        const deckType = this.#getDeckType(type);
        const indexOfCard = this.cardsGroups[deckType].indexOf(
            (card) => card.id === id,
        );
        this.cardsGroups[deckType].splice(indexOfCard, 1);
    }

    updateCardOnDeck({ id, type }) {
        const deckType = this.#getDeckType(type);
        const indexOfCard = this.cardsGroups[deckType].indexOf(
            (card) => card.id === id,
        );
        const updatedCard = new cardClass[deckType](localStorage.getItem(id));

        this.cardsGroups[deckType].splice(indexOfCard, 1, updatedCard);
    }

    #generateId(deckName) {
        const sanitizedName = `${deckName}`.replace(/[^a-z0-9_]/gi, '');
        const randomHex = Math.floor(Math.random() * 1000000).toString(16);
        const timeSignature = Number(new Date().getTime()).toString(16);

        return `CV_${sanitizedName}_${randomHex}_${timeSignature}`;
    }

    getCardsOfDeck(deckId) {
        return this.decks.find((deck) => deck.id === deckId).cardsIds;
    }

    createNewDeck(deckName, deckLang) {
        const id = this.#generateId(deckName);
        const name = deckName;
        const lang = deckLang;
        const cardsIds = Array.from(
            document.querySelectorAll('[data-inpdf="true"]'),
        ).map((element) => element.getAttribute('data-id'));

        const newDeck = { id, name, cardsIds, lang };
        localStorage.setItem(id, JSON.stringify(newDeck));

        return newDeck;
    }

    updateDeck(deckId, lang) {
        let deckToUpdate = this.decks.find((deck) => deck.id === deckId);
        const cardsIds = Array.from(
            document.querySelectorAll('[data-inpdf="true"]'),
        ).map((element) => element.getAttribute('data-id'));

        deckToUpdate = { ...deckToUpdate, cardsIds, lang };
        localStorage.setItem(deckId, JSON.stringify(deckToUpdate));

        return deckToUpdate;
    }

    removeDeck(deckId) {
        const indexOfDeckToRemove = this.decks.findIndex(
            (deck) => deck.id === deckId,
        );
        this.decks.splice(indexOfDeckToRemove, 1);
        localStorage.removeItem(deckId);
    }
}
