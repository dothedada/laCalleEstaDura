import type { ElementId, Section } from '../types';
import type { CardAction } from './hooksTypes';

export function sectionReducer(section: Section | null, action: CardAction) {
    switch (action.type) {
        case 'data_setted':
            return action.sectionData;

        case 'card_activated': {
            if (section === null) {
                return section;
            }
            const [hidden, active] = moveCardFromDeck(
                action.cardId,
                section.hidden,
                section.active,
            );
            if (section.multiple) {
                return {
                    ...section,
                    active: [active[0]],
                    hidden: [...active.slice(1), hidden],
                };
            }
            return { ...section, active, hidden };
        }

        case 'card_hidden': {
            if (section === null) {
                return section;
            }
            const [active, hidden] = moveCardFromDeck(
                action.cardId,
                section.active,
                section.hidden,
            );
            return { ...section, active, hidden };
        }

        case 'card_movedUp': {
            if (section === null) {
                return section;
            }
            const active = swapCards(true, action.cardId, section.active);
            return { ...section, active };
        }

        case 'card_movedDown': {
            if (section === null) {
                return section;
            }
            const active = swapCards(false, action.cardId, section.active);
            return { ...section, active };
        }

        case 'card_deleted': {
            if (section === null) {
                return section;
            }
            const hidden = section.hidden.filter((c) => c !== action.cardId);
            return { ...section, hidden };
        }

        case 'card_added': {
            if (section === null) {
                return section;
            }
            const active = [action.cardId, ...section.active];
            return { ...section, active };
        }

        default:
            console.log('Unknown action');
            return section;
    }
}

function moveCardFromDeck(
    id: ElementId,
    from: ElementId[],
    to: ElementId[],
): [from: ElementId[], to: ElementId[]] {
    const newFrom = from.filter((cardId) => cardId !== id);
    const newTo = [id, ...to];
    return [newFrom, newTo];
}

function swapCards(
    up: boolean,
    id: ElementId,
    active: ElementId[],
): ElementId[] {
    const index = active.indexOf(id);
    if (index < 0) {
        return active;
    }

    const arr = [...active];
    const swapIndex = up ? index - 1 : index + 1;
    if (arr[index] === undefined || arr[swapIndex] === undefined) {
        return active;
    }

    [arr[index], arr[swapIndex]] = [arr[swapIndex], arr[index]];
    return arr;
}
