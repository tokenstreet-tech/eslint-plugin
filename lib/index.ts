/**
 * @fileoverview tokenstreet ESLint plugin
 * @author Daniel Reichhart <daniel@tokenstreet.com>
 */

/*
 * ------------------------------------------------------------------------------
 *  Requirements
 * ------------------------------------------------------------------------------
 */
import type { Rule } from 'eslint';

import { noError } from './rules/no-error';
import { noLoggerErrorMethod } from './rules/no-logger-error-method';
import { noTextComponent } from './rules/no-text-component';
import { noThrow } from './rules/no-throw';

/*
 * ------------------------------------------------------------------------------
 *  Plugin Definition
 * ------------------------------------------------------------------------------
 */
const allRules: Record<string, Rule.RuleModule> = {
    'no-error': noError,
    'no-logger-error-method': noLoggerErrorMethod,
    'no-text-component': noTextComponent,
    'no-throw': noThrow,
};

const configureAsError = (rules: Record<string, Rule.RuleModule>): Record<string, 2> => {
    const result: Record<string, 2> = {};
    for (const key in rules) {
        if (Object.hasOwn(rules, key)) {
            result[`@tokenstreet/${key}`] = 2;
        }
    }
    return result;
};

// Import all rules in lib/rules
module.exports = {
    configs: {
        all: {
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
            plugins: ['@tokenstreet'],
            rules: configureAsError(allRules),
        },
    },
    rules: allRules,
};
