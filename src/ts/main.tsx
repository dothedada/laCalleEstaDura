import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import '../styles/reset.css';
import '../styles/styles.css';

import { Form, InputField, TextareaField } from './components/formElements.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Form id="car">
            <InputField type="text" placeholder="nanai" name="uno" />
            <InputField type="text" placeholder="nanasasdi" name="dos" />
            <InputField type="text" placeholder="nsd1i" name="tres" />
            <InputField type="text" placeholder="nai" name="cuatro" />
            <TextareaField placeholder="carajillo" name="bla" />
        </Form>
    </StrictMode>,
);
