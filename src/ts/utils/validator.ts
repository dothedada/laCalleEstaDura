import type { ErrorObject, Validations } from '../types';

export function validator(
    validate: Validations,
): (formInput: Record<string, string>) => ErrorObject {
    return function (formInput) {
        const messages: ErrorObject = {};

        for (const [field, validations] of Object.entries(validate)) {
            messages[field] = messages[field] ?? [];

            for (const [rule, message] of validations) {
                const value = formInput[field];

                if (value === undefined) {
                    continue;
                }

                if (
                    (typeof rule === 'function' && rule(formInput)) ||
                    (rule instanceof RegExp && rule.test(value))
                ) {
                    continue;
                }

                messages[field].push(message);
            }

            if (messages[field].length === 0) {
                delete messages[field];
            }
        }

        return messages;
    };
}
