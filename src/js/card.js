export class Card {
    constructor({ reference }) {
        this.id = this.#createId();
        this.reference = reference ?? `Referencia_${this.id.slice(-4)}`;
        this.type = undefined;
    }

    #createId() {
        const base = 16;
        const randomRange = 1000000;

        const time = Number(new Date().getTime()).toString(base);
        const random = Math.round(Math.random() * randomRange)
            .toString(base)
            .padStart(4, '0');

        return `${time}_${random}`;
    }

    checkIfTranslated(property) {
        if (!([`${property}Esp`] in this)) return;

        this[`${property}Translated`] = !!(
            this[`${property}Esp`] && this[`${property}Eng`]
        );
    }

    update(property, newValue) {
        if (!(property in this)) return;

        this[property] = newValue;
        this.checkIfTranslated(property.slice(0, -3));
    }

    reset(property) {
        if (!(property in this)) return;
        this[property] = undefined;
    }
}

export class Contact extends Card {
    constructor({ name, titleEsp, titleEng, email, phone, ...cardInfo }) {
        super(cardInfo);

        this.type = 'contact';
        this.name = name;
        this.titleEsp = titleEsp;
        this.titleEng = titleEng;
        this.checkIfTranslated('title');
        this.email = email;
        this.phone = phone;
    }
}

export class Profile extends Contact {
    constructor({ location, link1, link2, ...contactInfo }) {
        super(contactInfo);

        this.type = 'profile';
        this.location = location;
        this.link1 = link1;
        this.link2 = link2;
    }
}

export class Education extends Card {
    constructor({
        place,
        titleEsp,
        titleEng,
        timeStart,
        timeEnd = undefined,
        ...cardInfo
    }) {
        super(cardInfo);

        this.type = 'education';
        this.place = place;
        this.titleEsp = titleEsp;
        this.titleEng = titleEng;
        this.checkIfTranslated('title');
        this.timeStart = this.#setDate(timeStart);
        this.timeEnd = this.#setDate(timeEnd);
        this.#calculateTimeGap();
    }

    #setDate(date) {
        if (!date) {
            return 'active';
        }
        const formatedDate = date.replace(/[^0-9]/g, '/');
        const [month, year] = formatedDate.split('/');
        const newDate = new Date();
        newDate.setDate(1);
        newDate.setMonth(month - 1);
        newDate.setFullYear(year);

        return newDate;
    }

    #calculateTimeGap() {
        let timeEnd;

        if (this.timeEnd === 'active') {
            timeEnd = new Date();
        } else {
            timeEnd = this.timeEnd;
        }

        let years = timeEnd.getFullYear() - this.timeStart.getFullYear();
        let months = timeEnd.getMonth() - this.timeStart.getMonth();

        if (months < 0) {
            years--;
            months += 12;
        }

        this.timeGap = { years, months };
    }
}

export class Experience extends Education {
    constructor({ descriptionEsp, descriptionEng, ...educationCard }) {
        super(educationCard);

        this.type = 'experience';
        this.descriptionEsp = descriptionEsp;
        this.descriptionEng = descriptionEng;
        this.checkIfTranslated('description');
    }
}

// skills
// (reference, text*, list*)
// perfil
// (reference, text*)
