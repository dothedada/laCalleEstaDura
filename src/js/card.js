const createId = (base) => {
    const time = Number(new Date().getTime()).toString(base);
    const random = Math.round(Math.random() * 1000000).toString(base);
    return `${time}_${random}`;
};
export default class {
    constructor() {
        this.id = createId(16);
    }
}
