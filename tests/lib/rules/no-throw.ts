/**
 * @fileoverview
 * We use the ErrorHandler to handle warnings, errors and fatal errors,
 * which reacts appropriately and unified to the severity.
 * Therefore, this should always be used instead of throwing an error yourself.
 *
 * @author Daniel Reichhart <daniel@tokenstreet.com>
 */

/*
 * ------------------------------------------------------------------------------
 *  Requirements
 * ------------------------------------------------------------------------------
 */
import { RuleTester } from 'eslint';

import { noThrow } from '../../../lib/rules/no-throw';

/*
 * ------------------------------------------------------------------------------
 *  Tests
 * ------------------------------------------------------------------------------
 */

const ruleTester = new RuleTester({
    parserOptions: {
        ecmaVersion: 6,
        ecmaFeatures: {
            jsx: true,
        },
    },
});
const error: RuleTester.TestCaseError = {
    message: "Unallowed use of 'throw'. Please use the 'ErrorHandler' instead.",
    type: 'ThrowStatement',
};
ruleTester.run('no-throw', noThrow, {
    valid: [],
    invalid: [
        {
            code: "throw new Error('foo');",
            errors: [error],
        },
        {
            code: 'throw error;',
            errors: [error],
        },
    ],
});
