import { Button } from './form_components';
import type {
    ButtonType,
    CardInfoProps,
    CardStatus,
    FormProps,
    SectionProps,
} from './types_components';
import type { ElementId, Section } from '../types_app';
import { getItemFromLS } from '../utils/dataStorage';
import { useEffect, useReducer, useState } from 'react';
import { sectionReducer } from '../hooks/sectionReducer';
import { FormSectionSettings } from './section_header';
import { sectionBtnActions } from './section_actionsSetter';

function setCardData(id: ElementId, status: CardStatus, actions: ButtonType[]) {
    return { id, status, actions };
}

export function makeSectionWith(
    CardComponent: React.ComponentType<CardInfoProps>,
    FormComponent: React.ComponentType<Pick<FormProps, 'id'>>,
) {
    return function Section({ sectionId, active, hidden }: SectionProps) {
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
            return <div>Rendering...</div>;
        }

        return (
            <div id={sectionId}>
                <section>
                    <FormSectionSettings data={{ section, dispatch }} />

                    {currentCard === null ? (
                        <FormComponent />
                    ) : (
                        <Button style="new" text="new card" />
                    )}

                    <h2>Active</h2>
                    {section.active.map((id) =>
                        id === currentCard ? (
                            <FormComponent key={id} id={id} />
                        ) : (
                            <CardComponent
                                key={id}
                                {...setCardData(id, 'active', [
                                    {
                                        style: 'update',
                                        action: () => setCurrentCard(id),
                                        text: 'edit',
                                    },
                                    ...sectionBtnActions(id, active, dispatch),
                                ])}
                            />
                        ),
                    )}
                    <hr />

                    <h2>hidden</h2>
                    {section.active.map((id) => (
                        <CardComponent
                            key={id}
                            {...setCardData(
                                id,
                                'hidden',
                                sectionBtnActions(id, hidden, dispatch),
                            )}
                        />
                    ))}
                </section>
            </div>
        );
    };
}
