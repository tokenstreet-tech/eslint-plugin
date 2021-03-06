/**
 * @fileoverview
 * We use our `ErrorHandler` to handle warnings, errors and fatal errors,
 * which reacts appropriately and unified to the severity.
 * Therefore, this handler should always be used instead of throwing an error yourself.
 *
 * @author Daniel Reichhart <daniel@tokenstreet.com>
 */

/*
 * ------------------------------------------------------------------------------
 *  Requirements
 * ------------------------------------------------------------------------------
 */
import { RuleTester } from 'eslint';

import { noError } from '../../../lib/rules/no-error';

/*
 * ------------------------------------------------------------------------------
 *  Tests
 * ------------------------------------------------------------------------------
 */

const ruleTester = new RuleTester({ parserOptions: { ecmaFeatures: { jsx: true }, ecmaVersion: 6 } });
const error: RuleTester.TestCaseError = {
    message: "Unallowed use of a error class. Please use the 'ErrorHandler' instead.",
    type: 'NewExpression',
};
ruleTester.run('no-error', noError, {
    invalid: [
        { code: "new Error('foo');", errors: [error] },
        { code: "new EvalError('foo');", errors: [error] },
        { code: "new InternalError('foo');", errors: [error] },
        { code: "new RangeError('foo');", errors: [error] },
        { code: "new ReferenceError('foo');", errors: [error] },
        { code: "new SyntaxError('foo');", errors: [error] },
        { code: "new TypeError('foo');", errors: [error] },
        { code: "new URIError('foo');", errors: [error] },
        { code: "throw new Error('foo');", errors: [error] },
        { code: "throw new EvalError('foo');", errors: [error] },
        { code: "throw new InternalError('foo');", errors: [error] },
        { code: "throw new RangeError('foo');", errors: [error] },
        { code: "throw new ReferenceError('foo');", errors: [error] },
        { code: "throw new SyntaxError('foo');", errors: [error] },
        { code: "throw new TypeError('foo');", errors: [error] },
        { code: "throw new URIError('foo');", errors: [error] },
    ],
    valid: [
        'new FooClass()',
        "const Error = 'foo'",
        "ErrorHandler.error({ code: FrontendErrorCodeEnum.BAD_HEX_COLOR, filename: 'ColorUtil.ts' });",
    ],
});
