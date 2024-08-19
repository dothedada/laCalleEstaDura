export const createId = () => {
    const base = 16;
    const randomRange = 1000000;

    const time = Number(new Date().getTime()).toString(base);
    const random = Math.round(Math.random() * randomRange)
        .toString(base)
        .padStart(4, '0');

    return `${time}_${random}`;
};

const checkTranslation = (spanish, english) => {
    return !!(spanish && english);
};

export class Contact {
    constructor({ reference, name, titleEsp, titleEng, email, phone }) {
        this.id = createId();
        this.reference = reference ?? `Referencia_${this.id.slice(-4)}`;
        this.name = name;
        this.titleEsp = titleEsp;
        this.titleEng = titleEng;
        this.translated = checkTranslation(this.titleEsp, this.titleEng);
        this.email = email;
        this.phone = phone;
    }

    update(property, newValue) {
        if (!(property in this)) {
            return;
        }
        this[property] = newValue;
        const lang = property.slice(-3);
        if (lang === 'Esp' || lang === 'Eng') {
            const currentProperty = property.slice(0, -3);
            console.log(this[`${currentProperty}Eng`]);
            this.translated = checkTranslation(
                this[`${currentProperty}Esp`],
                this[`${currentProperty}Eng`],
            );
        }
    }
}

export class Profile extends Contact {
    constructor({ location, link1, link2, ...contactInfo }) {
        super(contactInfo);
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
