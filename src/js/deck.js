// TODO:
// Posibilidad de personalizar el orden de algunas secciones
// (Habilidades, referencias, Formacion)
import cardClass from './card';

export class MainDeck {
    constructor() {
        const inLS = this.loadLS();

        this.subDecks = inLS.cards.reduce(this.addCardToDeck);
        this.sets = inLS.sets;
    }

    // sets = [{setId: keygen, cardsIds: []}]

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

    getDeckType(type) {
        return /^skills/.test(type) ? 'skills' : type;
    }

    addCardToDeck(deck, card) {
        if (!card.type) {
            return deck;
        }
        const deckType = this.getDeckType(card.type);
        deck[deckType] = deck[deckType] || [];
        deck[deckType].push(new cardClass[card.type](card));

        return deck;
    }

    removeFromSets({ id, type }) {
        this.sets.forEach((set) => {
            const cardIdIndex = set.cardsIds.indexOf((cardId) => cardId === id);

            if (cardIdIndex > 0) {
                set.cardsIds.splice(cardIdIndex, 1);
            }
        });

        const deckType = this.getDeckType(type);
        const indexOfCard = this.subDecks[deckType].indexOf(
            (card) => card.id === id,
        );
        this.subDecks[deckType].splice(indexOfCard, 1);
    }

    updateCardOnDeck({ id, type }) {
        const deckType = this.getDeckType(type);
        const indexOfCard = this.subDecks[deckType].indexOf(
            (card) => card.id === id,
        );
        const updatedCard = new cardClass[deckType](localStorage.getItem(id));

        this.subDecks[deckType].splice(indexOfCard, 1, updatedCard);
    }
}

export class Deck {
    #cards = new Set();

    constructor({ name, cards }) {
        this.name = name;
        this.id = this.#generateId(name);
        if (cards) this.addCards(cards);
    }

    #generateId(name) {
        const sanitizedName = `${name}`.replace(/[^a-z0-9_]/gi, '');
        const randomHex = Math.floor(Math.random() * 1000000).toString(16);
        const timeSignature = Number(new Date().getTime()).toString(16);

        return `${sanitizedName}_${randomHex}_${timeSignature}`;
    }

    get getCards() {
        return this.#cards;
    }

    addCards(cards) {
        const cardsArray = !Array.isArray(cards) ? [cards] : cards;
        cardsArray.forEach((card) => this.#cards.add(card));
    }

    removeCards(cards) {
        const cardsArray = !Array.isArray(cards) ? [cards] : cards;
        cardsArray.forEach((card) => this.#cards.delete(card));
    }

    updateCards(cards) {
        const cardsArray = !Array.isArray(cards) ? [cards] : cards;
        this.#cards = new Set(cardsArray);
    }
}
