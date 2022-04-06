/**
 * @fileoverview
 *
 * @author Daniel Reichhart <daniel@tokenstreet.com>
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------
import { RuleTester } from 'eslint';
import { noError } from '../../../lib/rules/no-error';

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
    message: "Unallowed use of the 'Error' class. Please use the 'ErrorHandler'",
    type: 'ThrowStatement',
};
ruleTester.run('no-error', noError, {
    valid: [{ code: 'new FooClass()' }, { code: "const Error = 'foo'" }],
    invalid: [
        {
            code: "new Error('foo');",
            errors: [error],
        },
    ],
});
