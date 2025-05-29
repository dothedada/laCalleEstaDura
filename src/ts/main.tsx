import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import '../styles/reset.css';
import '../styles/styles.css';
import { Button, Input, Form } from './components/formElements';
import { validator } from './utils/validator';

const validate = validator({ email: [[/^a|^$/, 'bla']] });

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Form
            action={() => {
                console.log('carai');
            }}
            validator={validate}
        >
            <Input name="email" charLimit={15} value="nop" />
            <Input name="emaaaail" charLimit={15} value="sip" />
            <Button type="submit" buttonAction="new">
                new
            </Button>
        </Form>
    </StrictMode>,
);
