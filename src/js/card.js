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
        if ([`${property}Esp`] in this) {
            this[`${property}Translated`] = !!(
                this[`${property}Esp`] && this[`${property}Eng`]
            );
        }
    }

    update(property, newValue) {
        if (!(property in this)) {
            return;
        }
        this[property] = newValue;
        this.checkIfTranslated(property.slice(0, -3));
    }

    reset(property) {
        if (!(property in this)) {
            return;
        }

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
// contacto
// (reference, name, titleEsp, titleEng, email, link1, link2, phone, location)
// references
// (reference, name, titleEsp, titleEng, email, phone)

// skills
// (reference, text*, list*)
// perfil
// (reference, text*)

// experience
// (reference, place, title*, time start, time end, description*)
// education
// (reference, place, title*, time start, time end)
