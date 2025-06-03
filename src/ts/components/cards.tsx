import { ButtonsSet } from './formElements.tsx';
import type { CardInfoProps } from './components';
import { getItemFromLS } from '../utils/dataStorage.ts';
import { useMemo } from 'react';
import { makeCardDataFromElement } from '../utils/dataShapers.ts';

export function CardInfo(props: CardInfoProps) {
    const { status, actions } = props;
    const isActive = status === 'active';
    const style = isActive ? 'card_active' : 'card_hidden';

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

export function ElementInfo(props: CardInfoProps) {}
