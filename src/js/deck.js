export class Deck {
    constructor({ name, cards }) {
        this.name = name;
        this.id = this.#generateId(name);
        this.cards = new Set(cards)
    }

    #generateId(name) {
        const sanitizedName = `${name}`.replace(/[^a-z0-9_]/gi, '');
        const randomHex = Math.floor(Math.random() * 1000000).toString(16);
        const timeSignature = Number(new Date().getTime()).toString(16);

        return `${sanitizedName}_${randomHex}_${timeSignature}`;
    }
    //
}
