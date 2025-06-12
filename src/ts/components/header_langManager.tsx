import { useContext, useEffect, useState } from 'react';
import { LangContext } from '../hooks/context';
import type { CV, Langs } from '../types';

export function LangManager(props: {
    cvData: CV | null;
    setLang: (lang: Langs) => void;
}) {
    const [formActive, setFormActive] = useState<boolean>(false);
    const langsAvailable = Object.keys(props.cvData.langs) || ['es'];
    const lang = useContext(LangContext);

    const openForm = () => setFormActive(!formActive);

    return <div></div>;
}
