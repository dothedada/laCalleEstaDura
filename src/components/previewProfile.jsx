import { uiText } from './txtAndValidations';

const ProfilePreview = ({ data, lang }) => {
    const title = data[`title${lang}`] || uiText.global.nonTranslated;
    return (
        <>
            <div>
                <h2 className="name">{data.name}</h2>
                <div className="title">{title}</div>
            </div>
            <div>
                <div>
                    <a href={`mailto:${data.email}`}>{data.email}</a>
                </div>
                {data.link1 && (
                    <div>
                        <a href={data.link1} target="_blank">
                            {data.link1}
                        </a>
                    </div>
                )}
                {data.link2 && (
                    <div>
                        <a href={data.link2} target="_blank">
                            {data.link2}
                        </a>
                    </div>
                )}
                <div>{data.phone}</div>
                <div>{data.location}</div>
            </div>
        </>
    );
};

export default ProfilePreview;
