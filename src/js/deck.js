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
