import { ButtonsSet } from './formElements.tsx';
import type { ButtonType, CardInfoProps, CardStatus } from './components';
import type { ElementId, Section } from '../types';
import { getItemFromLS } from '../utils/dataStorage.ts';
import { useEffect, useMemo, useReducer } from 'react';
import { sectionReducer } from '../hooks/cardReducer.ts';
import { makeCardDataFromElement } from '../utils/dataShapers.ts';

export function CardInfo(props: CardInfoProps) {
    const { status, activeActions, hiddenActions } = props;
    const isActive = status === 'active';
    const style = isActive ? 'card_active' : 'card_hidden';
    const actions = isActive ? activeActions : hiddenActions;

    const data = useMemo(() => getItemFromLS(props.id), [props.id]);
    const overview = useMemo(() => makeCardDataFromElement(data), [data]);

    return (
        <div id={props.id} className={style}>
            <div className="info">
                <h4>{overview.title}</h4>
                <p>{overview.text}</p>
            </div>
            <ButtonsSet buttons={actions} />
        </div>
    );
}

export function Section(sectionId: ElementId) {
    const [section, dispatch] = useReducer(sectionReducer, null);
    // const [currentCard, setCurrentCard] = useState<ElementId| null>('null');

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

    const setActiveButtonData = (cardId: ElementId): ButtonType[] => {
        return [
            {
                buttonAction: 'update',
                action: () => dispatch({ type: 'card_movedUp', cardId }),
                text: 'move up',
            },
            {
                buttonAction: 'update',
                action: () => dispatch({ type: 'card_movedDown', cardId }),
                text: 'move down',
            },
            {
                buttonAction: 'update',
                action: () => dispatch({ type: 'card_hidden', cardId }),
                text: 'hide',
            },
        ];
    };

    const setHiddenButtonData = (cardId: ElementId): ButtonType[] => {
        return [
            {
                buttonAction: 'update',
                action: () => dispatch({ type: 'card_activated', cardId }),
                text: 'move up',
            },
            {
                buttonAction: 'update',
                action: () => dispatch({ type: 'card_deleted', cardId }),
                text: 'move down',
            },
        ];
    };

    return (
        <div id={sectionId}>
            <section>
                <h2>Active</h2>
                {section.active.map((cardId) => {
                    const buttonSetData = {
                        id: cardId as ElementId,
                        status: 'active' as CardStatus,
                        activeActions: setActiveButtonData(cardId),
                        hiddenActions: setHiddenButtonData(cardId),
                    };
                    return <CardInfo {...buttonSetData} />;
                })}
            </section>
        </div>
    );
}
