import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import '../styles/reset.css';
import '../styles/styles.css';
import { Button, Input, Form } from './components/formElements';
import { validator } from './utils/validator';
import { TextForm } from './components/forms';

const validate = validator({ email: [[/^a|^$/, 'bla']] });

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <TextForm
            section="contact"
            id="contact_text_20250605-2210i44bb3"
            name="name"
            hiddenLabel={true}
            validations={{ name: [[/^[^a]/, 'inicia con a']] }}
        />
    </StrictMode>,
);
