import { parseDate } from '../components/txtAndValidations';

class Card {
    constructor({ reference = undefined, id = undefined, type = undefined }) {
        this.id = id || this.#createId();
        this.reference = reference || `Referencia_${this.id.slice(-5)}`;
        this.type = type;
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
        if (!(property in this) || property === 'id') {
            return;
        }
        this[property] = /^time[SE]/.test(property)
            ? parseDate(newValue)
            : newValue;
        this.checkIfTranslated(property.slice(0, -3));
    }
}

class References extends Card {
    constructor({ name, titleEsp, titleEng, email, phone, ...cardInfo }) {
        super(cardInfo);

        this.name = name;
        this.titleEsp = titleEsp;
        this.titleEng = titleEng;
        this.checkIfTranslated('title');
        this.email = email;
        this.phone = phone;
    }
}

class Profile extends References {
    constructor({ location, link1, link2, ...contactInfo }) {
        super(contactInfo);

        this.location = location;
        this.link1 = link1;
        this.link2 = link2;
    }
}

class Education extends Card {
    constructor({
        place,
        titleEsp,
        titleEng,
        timeStart,
        timeEnd = undefined,
        ...cardInfo
    }) {
        super(cardInfo);

        this.place = place;
        this.titleEsp = titleEsp;
        this.titleEng = titleEng;
        this.checkIfTranslated('title');
        this.timeStart = parseDate(timeStart);
        this.timeEnd = parseDate(timeEnd);
        this.#calculateTimeGap();
    }

    #calculateTimeGap() {
        const timeEnd = /^$|current|actual(idad)?/gi.test(this.timeEnd)
            ? new Date()
            : this.timeEnd;

        let years = timeEnd.getFullYear() - this.timeStart.getFullYear();
        let months = timeEnd.getMonth() - this.timeStart.getMonth();

        if (months < 0) {
            years--;
            months += 12;
        }

        this.timeGap = { years, months };
    }
}

class Experience extends Education {
    constructor({ descriptionEsp, descriptionEng, ...educationInfo }) {
        super(educationInfo);

        this.descriptionEsp = descriptionEsp;
        this.descriptionEng = descriptionEng;
        this.checkIfTranslated('description');
    }
}

class TextBlock extends Card {
    constructor({ descriptionEsp, descriptionEng, ...cardInfo }) {
        super(cardInfo);

        this.descriptionEsp = descriptionEsp;
        this.descriptionEng = descriptionEng;
        this.checkIfTranslated('description');
    }
}

class ListBlock extends Card {
    constructor({ list, listTitleEsp, listTitleEng, ...cardInfo }) {
        super(cardInfo);

        this.listTitleEsp = listTitleEsp;
        this.listTitleEng = listTitleEng;
        this.checkIfTranslated('listTitle');
        this.list = [...list];
    }

    swapElements(fromIndex, toIndex) {
        if (
            fromIndex < 0 ||
            fromIndex >= this.list.length ||
            toIndex < 0 ||
            toIndex >= this.list.length ||
            fromIndex === toIndex
        ) {
            return;
        }

        [this.list[fromIndex], this.list[toIndex]] = [
            this.list[toIndex],
            this.list[fromIndex],
        ];
    }

    filterLang(lang) {
        const langIndex = /esp/i.test(lang) ? 0 : 1;

        return this.list.map((element) =>
            Array.isArray(element) ? element[langIndex] : element,
        );
    }
}

export default {
    experience: Experience,
    education: Education,
    profile: Profile,
    references: References,
    bio: TextBlock,
    skillsText: TextBlock,
    skillsList: ListBlock,
};
