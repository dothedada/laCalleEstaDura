import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import '../styles/reset.css';
import '../styles/styles.css';
import { TextForm } from './components/forms';
import { AppBody } from './components/body';
import { LangForm } from './components/formLang';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
		<LangForm currentCV={{id: "CV_a_b_c-d", langs}}
    </StrictMode>,
);
