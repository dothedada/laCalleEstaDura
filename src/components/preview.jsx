import CardsGroup from './decksCardsGroups';
import { DynamicCard } from './decksGenerator';

const Preview = ({ renderInPdf = [], lang = 'Esp' }) => {
    const arrangedCards = [...renderInPdf].reduce((decks, cardId) => {
        const card = JSON.parse(localStorage.getItem(cardId));
        const cardType = /^skills/.test(card.type) ? 'skills' : card.type;

        decks[cardType] = decks[cardType] || [];
        decks[cardType].push(card);

        return decks;
    }, {});

    const types = Object.keys(arrangedCards);
    // cargar ids
    // buscarlas en el ls
    // ordenarlas grupos de preview
    //
    // obtener los visibles
    // cambiar el preview?
    // cambiar idioma de previsualización
    // exportar
    //

    console.log(arrangedCards);

    return (
        <div className="preview">
            {types.map((type) => (
                <div className={`preview ${type}`} key={type}>
                    {arrangedCards[type].map((card) => (
                        <DynamicCard
                            data={card}
                            inPdf={true}
                            lang={lang}
                            key={card.id}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};

export { Preview };
