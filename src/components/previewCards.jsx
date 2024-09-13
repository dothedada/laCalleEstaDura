import { months } from './txtAndValidations';

const formatDate = (date) => {
    if (!(date instanceof Date) && !/^$|current|actual(idad)?/gi.test(date)) {
        return;
    }

    const workingDate = date instanceof Date ? date : new Date();
    return `${months[workingDate.getMonth()]} ${workingDate.getFullYear()}`;
};

const dateLabel = (date) => {
    if (!(date instanceof Date) && !/^$|current|actual(idad)?/gi.test(date)) {
        return;
    }

    const workingDate = date instanceof Date ? date : new Date();
    const formatedMonth = `${+workingDate.getMonth() + 1}`.padStart(2, '0');
    return `${workingDate.getFullYear()}-${formatedMonth}`;
};

const ExperiencePreview = ({ data, lang = 'Esp' }) => {
    return (
        data && (
            <article>
                <header>
                    <h3>
                        {data.place}
                        <span className="date">
                            <time dateTime={dateLabel(data.timeStart)}>
                                {formatDate(data.timeStart)}{' '}
                            </time>
                            -
                            <time dateTime={dateLabel(data.timeEnd)}>
                                {' '}
                                {formatDate(data.timeEnd)}
                            </time>
                        </span>
                    </h3>
                    <div className="title">{data[`title${lang}`]}</div>
                </header>
                <p>{data[`description${lang}`]}</p>
            </article>
        )
    );
};

const ProfilePreview = ({ data, lang = 'Esp' }) => {
    return (
        data && (
            <div className="card__preview twoCol">
                <div>
                    <h2 className="name">{data.name}</h2>
                    <div className="title">{data[`title${lang}`]}</div>
                </div>
                <div>
                    <div>Mail: {data.email}</div>
                    {data.link1 && (
                        <div>
                            Link 1:{' '}
                            <a href={data.link1} target="_blank">
                                {data.link1}
                            </a>
                        </div>
                    )}
                    {data.link2 && (
                        <div>
                            Link 2:{' '}
                            <a href={data.link2} target="_blank">
                                {data.link2}
                            </a>
                        </div>
                    )}
                    <div>Teléfono: {data.phone}</div>
                    <div>Ubicación: {data.location}</div>
                </div>
            </div>
        )
    );
};

const BioPreview = ({ data, lang = 'Esp' }) => {
    return data && <p className="card__preview">{data.descriptionEsp}</p>;
};

export { ProfilePreview, BioPreview };
