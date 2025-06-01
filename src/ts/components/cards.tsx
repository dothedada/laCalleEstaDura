import { ButtonsSet } from './formElements.tsx';
import type { CardInfoProps } from './components';

export function CardInfo(props: CardInfoProps) {
    const { status, activeActions, hiddenActions } = props;
    const isActive = status === 'active';
    const style = isActive ? 'card_active' : 'card_hidden';
    const actions = isActive ? activeActions : hiddenActions;

    return (
        <div id={props.id} className={style}>
            <div className="info">
                <h4>{props.title}</h4>
                <p>{props.text}</p>
            </div>
            <ButtonsSet buttons={actions} />
        </div>
    );
}
