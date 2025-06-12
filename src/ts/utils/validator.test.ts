import { describe, it, expect } from 'vitest';
import type { Validations } from '../types_app';
import { validator } from './validator';

const required = (key: string) => (input: Record<string, string>) =>
    !!input[key]?.trim();

describe('validator', () => {
    it('returns no messages if all fields pass validation', () => {
        const validate: Validations = {
            username: [[required('username'), 'Required']],
            email: [[/^[^@]+@[^@]+\.[^@]+$/, 'Invalid email']],
        };

        const validateFn = validator(validate);

        const result = validateFn({
            username: 'miguel',
            email: 'test@example.com',
        });

        expect(result).toEqual({});
    });

    it('returns error message if required field is empty string', () => {
        const validate: Validations = {
            username: [[required('username'), 'Required']],
        };

        const validateFn = validator(validate);

        const result = validateFn({ username: '' });

        expect(result).toEqual({
            username: ['Required'],
        });
    });

    it('returns error if regex does not match', () => {
        const validate: Validations = {
            email: [[/^[^@]+@[^@]+\.[^@]+$/, 'Invalid email']],
        };

        const validateFn = validator(validate);

        const result = validateFn({
            email: 'invalid',
        });

        expect(result).toEqual({
            email: ['Invalid email'],
        });
    });

    it('returns multiple messages for multiple failing rules', () => {
        const validate: Validations = {
            password: [
                [/^.{8,}$/, 'Too short'],
                [/[A-Z]/, 'Missing uppercase'],
            ],
        };

        const validateFn = validator(validate);

        const result = validateFn({
            password: 'abc',
        });

        expect(result).toEqual({
            password: ['Too short', 'Missing uppercase'],
        });
    });

    it('allows cross-field validation', () => {
        const validate: Validations = {
            confirm: [
                [(input) => input.confirm === input.password, 'No match'],
            ],
        };

        const validateFn = validator(validate);

        const result = validateFn({
            password: '123',
            confirm: 'abc',
        });

        expect(result).toEqual({
            confirm: ['No match'],
        });
    });

    it('ignores fields not in validation schema', () => {
        const validate: Validations = {};

        const validateFn = validator(validate);

        const result = validateFn({
            random: 'value',
        });

        expect(result).toEqual({});
    });
});
