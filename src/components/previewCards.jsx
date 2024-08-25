const ExperiencePreview = ({ data, lang }) => {
    return (
        <article>
            <header>
                <h3>
                    {data.place}
                    <span className="date">
                        <time dateTime="2012-03">{data.timeStart}</time>-
                        <time dateTime="2014-07">{data.timeEnd}</time>
                    </span>
                </h3>
                <div className="title">{data[`title${lang}`]}</div>
            </header>
            <p>{data[`description${lang}`]}</p>
        </article>
    );
};

export { ExperiencePreview };
