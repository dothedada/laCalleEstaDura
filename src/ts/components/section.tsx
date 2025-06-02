import { Button } from './formElements.tsx';
import type {
    ButtonType,
    CardInfoProps,
    CardStatus,
    FormProps,
} from './components';
import type { ElementId, Section } from '../types';
import { getItemFromLS } from '../utils/dataStorage.ts';
import { useEffect, useReducer, useState, type Dispatch } from 'react';
import { sectionReducer } from '../hooks/sectionReducer.ts';
import type { CardAction, SetCardActions } from '../hooks/hooksTypes';

export const sectionActiveActions: SetCardActions[] = [
    { text: 'move up', buttonAction: 'update', type: 'card_movedUp' },
    { text: 'move down', buttonAction: 'update', type: 'card_movedDown' },
    { text: 'hide', buttonAction: 'update', type: 'card_hidden' },
];

export const sectionHiddenActions: SetCardActions[] = [
    { text: 'activate', buttonAction: 'update', type: 'card_activated' },
    { text: 'remove', buttonAction: 'update', type: 'card_deleted' },
];

function sectionBtnActions(
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

export function makeSectionWith(
    CardComponent: React.ComponentType<CardInfoProps>,
    FormComponent: React.ComponentType<Pick<FormProps, 'id'>>,
) {
    return function Section({
        sectionId,
        active,
        hidden,
    }: {
        sectionId: ElementId;
        active: SetCardActions[];
        hidden: SetCardActions[];
    }) {
        const [section, dispatch] = useReducer(sectionReducer, null);
        const [currentCard, setCurrentCard] = useState<ElementId | null>(null);

        useEffect(() => {
            const loadedSection = getItemFromLS(sectionId) as Section;
            if (loadedSection === null) {
                throw new Error(`Cannot load Section: '${sectionId}'`);
            }
            dispatch({ type: 'data_setted', sectionData: loadedSection });
        }, [sectionId]);

        if (section === null) {
            return <div>Rendering</div>;
        }

        return (
            <div id={sectionId}>
                <section>
                    {currentCard === null ? (
                        <FormComponent />
                    ) : (
                        <Button buttonAction="new" text="new card" />
                    )}
                    <h2>Active</h2>
                    {section.active.map((id) => {
                        const cardData = {
                            id,
                            status: 'active' as CardStatus,
                            actions: [
                                {
                                    buttonAction: 'update',
                                    action: () => setCurrentCard(id),
                                    text: 'edit',
                                } satisfies ButtonType,
                                ...sectionBtnActions(id, active, dispatch),
                            ],
                        };

                        return id === currentCard ? (
                            <FormComponent key={id} id={id} />
                        ) : (
                            <CardComponent key={id} {...cardData} />
                        );
                    })}
                    <hr />
                    <h2>hidden</h2>
                    {section.active.map((id) => {
                        const cardData = {
                            id: id,
                            status: 'hidden' as CardStatus,
                            actions: sectionBtnActions(id, hidden, dispatch),
                        };
                        return <CardComponent key={id} {...cardData} />;
                    })}
                </section>
            </div>
        );
    };
}
