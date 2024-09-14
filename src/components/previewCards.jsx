import { months, uiText } from './txtAndValidations';

const formatDate = (date) => {
    if (!(date instanceof Date) && !/^$|current|actual(idad)?/gi.test(date)) {
        return;
    }

    const workingDate = date instanceof Date ? date : new Date();
    return `${months[workingDate.getMonth()]['Esp']} ${workingDate.getFullYear()}`;
};

const dateLabel = (date) => {
    if (!(date instanceof Date) && !/^$|current|actual(idad)?/gi.test(date)) {
        return;
    }

    const workingDate = date instanceof Date ? date : new Date();
    const formatedMonth = `${+workingDate.getMonth() + 1}`.padStart(2, '0');
    return `${workingDate.getFullYear()}-${formatedMonth}`;
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
    return (
        data && <p className="card__preview">{data[`description${lang}`]}</p>
    );
};

const ExperiencePreview = ({ data, lang = 'Esp' }) => {
    return (
        data && (
            <article>
                <header>
                    <h3>
                        {`${data.place} `}
                        <span className="secondary">
                            <time dateTime={dateLabel(data.timeStart)}>
                                {formatDate(data.timeStart)}
                            </time>
                            {' - '}
                            <time dateTime={dateLabel(data.timeEnd)}>
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

const SkillsTextPreview = ({ data, lang = 'Esp' }) => {
    return (
        data && <p className="card__preview">{data[`description${lang}`]}</p>
    );
};

const SkillsListPreview = ({ data, lang = 'Esp' }) => {
    const listTitle = data[`listTitle${lang}`];
    const langIndex = lang === 'Esp' ? 0 : 1;
    const visibleSkills = data.list.reduce((list, item) => {
        if (/[/]/.test(item.value)) console.log(item.value);
        if (item.visible) {
            list.push(
                /[/]/.test(item.value)
                    ? item.value.split('/')[langIndex]
                    : item.value,
            );
        }
        return list;
    }, []);

    return (
        data && (
            <>
                {listTitle && <h3>{listTitle}</h3>}
                <ul className="card__preview">
                    {visibleSkills.map((skill) => (
                        <li key={skill.id}>{skill}</li>
                    ))}
                </ul>
            </>
        )
    );
};

const ContactPreview = ({ data, lang = 'Esp' }) => {
    return (
        data && (
            <div>
                <h3>{data.name}</h3>
                <div>{data[`title${lang}`]}</div>
                <div>
                    <a href={`mailto:${data.email}`}>{data.email}</a>
                    {uiText.global.separator.type2}
                    {data.phone}
                </div>
            </div>
        )
    );
};

const EducationPreview = ({ data, lang = 'Esp' }) => {
    const dateToDisplay = `${data?.timeStart.getFullYear()} - ${data?.timeEnd.getFullYear()}`;
    return (
        data && (
            <div>
                <h3>{data[`title${lang}`]}</h3>
                <p>
                    {data.place} ({dateToDisplay})
                </p>
            </div>
        )
    );
};
export {
    ProfilePreview,
    BioPreview,
    ExperiencePreview,
    SkillsTextPreview,
    SkillsListPreview,
    ContactPreview,
    EducationPreview,
};
