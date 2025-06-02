import { ElementId } from '../types';

export type CardAction =
    | { type: 'data_setted'; sectionData: Section }
    | { type: 'card_activated'; cardId: ElementId }
    | { type: 'card_hidden'; cardId: ElementId }
    | { type: 'card_movedUp'; cardId: ElementId }
    | { type: 'card_movedDown'; cardId: ElementId }
    | { type: 'card_deleted'; cardId: ElementId }
    | { type: 'card_added'; cardId: ElementId };
