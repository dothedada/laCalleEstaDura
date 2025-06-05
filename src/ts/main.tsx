import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import '../styles/reset.css';
import '../styles/styles.css';
import { TextForm } from './components/forms';
import { AppBody } from './components/body';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <AppBody>
            <TextForm
                section="contact"
                id="contact_text_20250605-2210i44bb3"
                name="name"
                hiddenLabel={true}
                validations={{ name: [[/^[^a]/, 'inicia con a']] }}
            />
        </AppBody>
    </StrictMode>,
);
