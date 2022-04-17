/**
 * @fileoverview
 * The logger methods "warn", "error" and "fatal" should not be used directly.
 * Instead, one should call the ErrorHandler, which reacts appropriately to the status and calls the logger.
 *
 * @author Daniel Reichhart <daniel@tokenstreet.com>
 */

/*
 * ------------------------------------------------------------------------------
 *  Requirements
 * ------------------------------------------------------------------------------
 */
import { RuleTester } from 'eslint';

import { noLoggerErrorMethod } from '../../../lib/rules/no-logger-error-method';

/*
 * ------------------------------------------------------------------------------
 *  Tests
 * ------------------------------------------------------------------------------
 */

const ruleTester = new RuleTester({ parserOptions: { ecmaFeatures: { jsx: true }, ecmaVersion: 6 } });
const error: RuleTester.TestCaseError = {
    message: "Unallowed use of a logger error method. Please use the 'ErrorHandler' instead.",
    type: 'MemberExpression',
};
ruleTester.run('no-logger-error-method', noLoggerErrorMethod, {
    invalid: [
        { code: "Logger.warn('Logger.ts', 'message');", errors: [error] },
        { code: "Logger.error('Logger.ts', 'message');", errors: [error] },
        { code: "Logger.fatal('Logger.ts', 'message');", errors: [error] },
    ],
    valid: ["Logger.debug('Logger.ts', 'message');", "Logger.info('Logger.ts', 'message');"],
});
