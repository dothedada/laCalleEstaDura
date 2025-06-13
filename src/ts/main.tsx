import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import '../styles/reset.css';
import '../styles/styles.css';
import { FormSectionSettings } from './components/section_header.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <FormSectionSettings
            name="uno"
            title="dos"
            action={(e) => console.log(e)}
        />
    </StrictMode>,
);
