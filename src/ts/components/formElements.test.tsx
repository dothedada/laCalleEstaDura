import { describe, it, expect, vi } from 'vitest';
import { screen, act, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import { Button, Input, Select } from './formElements';
import type { ButtonProp, InputFieldProps } from './components';

describe('Button', () => {
    it('should render with the given name', () => {
        const randomText = Math.floor(Math.random() * 1_000_000).toString(16);
        const callback = vi.fn();
        const props: ButtonProp = {
            buttonType: 'new',
            action: callback,
        };

        render(<Button {...props}>{randomText}</Button>);

        const button = screen.getByText(randomText);
        expect(button).toBeInTheDocument();
    });

    it('should match the class with the given button type', () => {
        const btnText = 'click me';
        const callback = vi.fn();
        const props: ButtonProp = {
            buttonType: 'delete',
            action: callback,
        };

        render(<Button {...props}>{btnText}</Button>);

        const button = screen.getByText(btnText);
        expect(button).toHaveClass('delete');
    });

    it('should execute the given callback on click', async () => {
        const user = userEvent.setup();
        const btnText = 'click me';
        const callback = vi.fn();
        const props: ButtonProp = {
            buttonType: 'delete',
            action: callback,
        };

        render(<Button {...props}>{btnText}</Button>);
        const button = screen.getByText(btnText);
        await user.click(button);

        expect(callback).toBeCalled();
    });

    it('should only execute the callback only with Enter and Space key', async () => {
        const user = userEvent.setup();
        const btnText = 'click me';
        const callback = vi.fn();
        const props: ButtonProp = {
            buttonType: 'delete',
            action: callback,
        };

        render(<Button {...props}>{btnText}</Button>);
        const button = screen.getByText(btnText);
        button.focus();
        await user.keyboard('{Enter}');
        await user.keyboard(' ');
        await user.keyboard('a');
        expect(callback).toBeCalledTimes(2);
    });
});

describe('input', () => {
    it('should render the default value or "" if none', () => {
        const randomText = Math.floor(Math.random() * 1_000_000).toString(16);
        const propsWithValue: InputFieldProps = {
            name: 'withValue',
            value: randomText,
        };

        const propsWithoutValue: InputFieldProps = {
            name: 'withoutValue',
        };

        render(
            <>
                <Input {...propsWithValue} />
                <Input {...propsWithoutValue} />
            </>,
        );
        const input1 = screen.getByRole('textbox', { name: 'withValue' });
        const input2 = screen.getByRole('textbox', { name: 'withoutValue' });
        expect(input1).toHaveValue(randomText);
        expect(input2).toHaveValue('');
    });

    it('should not allow input beyond character limit', async () => {
        const user = userEvent.setup();
        const props = {
            name: 'test',
            charLimit: 5,
        };
        render(<Input {...props} />);

        const input = screen.getByRole('textbox');
        await user.type(input, '1234567890');

        expect(input).toHaveValue('12345');
    });

    it('should show character counter when remaining chars < 10', async () => {
        const user = userEvent.setup();
        const props = {
            name: 'test',
            charLimit: 15,
        };
        render(<Input {...props} />);

        const input = screen.getByRole('textbox');
        await user.type(input, '123456');

        expect(screen.getByText('6/15')).toBeInTheDocument();
    });

    it('should render label with correct text', () => {
        render(<Input name="username" label="User Name" />);

        expect(screen.getByText('User Name')).toBeInTheDocument();
    });

    it('should hide label when hiddenLabel is true', () => {
        const props = {
            name: 'test',
            label: 'Hidden Label',
            hiddenLabel: true,
        };
        render(<Input {...props} />);

        const label = screen.getByText('Hidden Label');
        expect(label).toHaveClass('sr-only');
    });

    it('should apply additional attributes', () => {
        const props = {
            name: 'test',
            attributes: { 'data-testid': 'custom-input', disabled: true },
        };
        render(<Input {...props} />);

        const input = screen.getByRole('textbox');
        expect(input).toHaveAttribute('data-testid', 'custom-input');
        expect(input).toBeDisabled();
    });
});

describe('Select', () => {
    const selectValues = [
        { name: 'Option 1', value: 'opt1' },
        { name: 'Option 2', value: 'opt2' },
        { name: 'Option 3', value: 'opt3' },
    ];

    it('should hide label when hiddenLabel is true', () => {
        const props = {
            name: 'test',
            selectValues,
            action: vi.fn(),
            hiddenLabel: true,
            label: 'Hidden Label',
        };
        render(<Select {...props} />);

        const label = screen.getByText('Hidden Label');
        expect(label).toHaveClass('sr-only');
    });

    it('should render all options', () => {
        const props = {
            name: 'test',
            selectValues,
            action: vi.fn(),
        };
        render(<Select {...props} />);

        expect(screen.getByText('Option 1')).toBeInTheDocument();
        expect(screen.getByText('Option 2')).toBeInTheDocument();
        expect(screen.getByText('Option 3')).toBeInTheDocument();
    });

    it('should have default value selected', () => {
        const props = {
            name: 'test',
            selectValues,
            action: vi.fn(),
            defaultValue: 'opt2',
        };
        render(<Select {...props} />);

        const select = screen.getByRole('combobox');
        expect(select).toHaveValue('opt2');
    });

    it('should execute callback on selection change', async () => {
        const user = userEvent.setup();
        const callback = vi.fn();
        const props = {
            name: 'test',
            selectValues,
            action: callback,
        };
        render(<Select {...props} />);

        const select = screen.getByRole('combobox');
        await user.selectOptions(select, 'opt2');
        expect(callback).toBeCalled();
    });

    it('should call callback with correct value', async () => {
        const user = userEvent.setup();
        const callback = vi.fn();
        const props = {
            name: 'test',
            selectValues,
            action: callback,
        };
        render(<Select {...props} />);

        const select = screen.getByRole('combobox');
        await user.selectOptions(select, 'opt3');
        expect(callback).toHaveBeenCalledWith('opt3');
    });

    it('should have correct name attribute', () => {
        const props = {
            name: 'test-select',
            selectValues,
            action: vi.fn(),
        };
        render(<Select {...props} />);

        const select = screen.getByRole('combobox');
        expect(select).toHaveAttribute('name', 'test-select');
    });

    it('should allow selecting different options', async () => {
        const user = userEvent.setup();
        const props = {
            name: 'test',
            selectValues,
            action: vi.fn(),
        };
        render(<Select {...props} />);

        const select = screen.getByRole('combobox');
        await user.selectOptions(select, 'opt1');
        expect(select).toHaveValue('opt1');

        await user.selectOptions(select, 'opt3');
        expect(select).toHaveValue('opt3');
    });
});
