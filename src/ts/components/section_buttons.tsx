import type { ButtonType } from './types_components';
import type { ElementId } from '../types_app';
import type { Dispatch } from 'react';
import type { CardAction, SetCardActions } from '../hooks/types_hooks';

export const sectionActiveActions: SetCardActions[] = [
    { text: 'move up', buttonAction: 'update', type: 'card_movedUp' },
    { text: 'move down', buttonAction: 'update', type: 'card_movedDown' },
    { text: 'hide', buttonAction: 'update', type: 'card_hidden' },
];

export const sectionHiddenActions: SetCardActions[] = [
    { text: 'activate', buttonAction: 'update', type: 'card_activated' },
    { text: 'remove', buttonAction: 'update', type: 'card_deleted' },
];

export function sectionBtnActions(
    cardId: ElementId,
    actions: SetCardActions[],
    callback: Dispatch<CardAction>,
): ButtonType[] {
    return actions.map(({ text, buttonAction, type }) => ({
        buttonAction,
        action: () => callback({ type, cardId }),
        text,
    }));
}
