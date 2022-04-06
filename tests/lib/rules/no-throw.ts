/**
 * @fileoverview
 *
 * @author Daniel Reichhart <daniel@tokenstreet.com>
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------
import { RuleTester } from 'eslint';
import { noThrow } from '../../../lib/rules/no-throw';

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
    parserOptions: {
        ecmaVersion: 6,
        ecmaFeatures: {
            jsx: true,
        },
    },
});
const error: RuleTester.TestCaseError = {
    message: "Unallowed use of 'throw'. Please use the 'ErrorHandler'",
    type: 'ThrowStatement',
};
ruleTester.run('no-throw', noThrow, {
    valid: [],
    invalid: [
        {
            code: "new Error('foo');",
            errors: [error],
        },
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
