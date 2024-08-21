export class Deck {
    constructor({ name, cards }) {
        this.name = name;
        this.id = this.#generateId(name);
        if (cards) this.addCards(cards);
    }

    #cards = new Set();

    #generateId(name) {
        const sanitizedName = `${name}`.replace(/[^a-z0-9_]/gi, '');
        const randomHex = Math.floor(Math.random() * 1000000).toString(16);
        const timeSignature = Number(new Date().getTime()).toString(16);

        return `${sanitizedName}_${randomHex}_${timeSignature}`;
    }

    get cards() {
        return this.#cards;
    }

    addCards(cards) {
        const cardsArray = !Array.isArray(cards) ? [cards] : cards;
        cardsArray.forEach((card) => this.#cards.add(card));
    }

    //
}
