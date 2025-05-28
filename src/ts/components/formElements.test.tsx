import { describe, it, expect } from 'vitest';
import { screen, act, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import { Button } from './formElements';
import type { ButtonProp } from './components';

describe('Button', () => {
    it('should render with the given name', () => {
        const randomText = Math.floor(Math.random() * 1_000_000).toString(16);
        const props: ButtonProp = {
            buttonType: 'new',
            action: () => console.log(randomText),
        };

        render(<Button {...props}>{randomText}</Button>);

        const button = screen.getByText(randomText);
        expect(button).toBeInTheDocument();
    });

    it('should contain a class according to its type', () => {
        const randomText = Math.floor(Math.random() * 1_000_000).toString(16);
        const props: ButtonProp = {
            buttonType: 'delete',
            action: () => console.log(randomText),
        };

        render(<Button {...props}>{randomText}</Button>);

        const button = screen.getByText(randomText);
        expect(button).toHaveClass('delete');
    });
});
