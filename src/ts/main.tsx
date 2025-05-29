import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import '../styles/reset.css';
import '../styles/styles.css';
import {
    Button,
    Input,
    KeyValueInput,
    Select,
    Form,
} from './components/formElements';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Button buttonAction="new" action={() => console.log('meneala')}>
            carajo
        </Button>
        <Input name="carajo" label="pero queeeee" charLimit={15} />
        <KeyValueInput
            kProps={{ name: 'carai', label: 'key', charLimit: 5 }}
            vProps={{ name: 'corcholis', label: 'value' }}
        />
        <Select
            hiddenLabel={false}
            label="carai select"
            name="ñom ñom"
            action={(e) => console.log(e)}
            selectValues={[
                { name: 'uno', value: '1' },
                { name: 'dos', value: '2' },
                { name: 'tres', value: '3' },
            ]}
        />
        <Form id="mini" action={(e) => console.log(e)}>
            <Input name="carajo" label="pero queeeee" charLimit={15} />

            <Button type="submit" buttonAction="delete">
                delete
            </Button>
            <Button type="submit" buttonAction="new">
                new
            </Button>
        </Form>
    </StrictMode>,
);
