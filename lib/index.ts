/**
 * @fileoverview tokenstreet ESLint plugin
 * @author Daniel Reichhart <daniel@tokenstreet.com>
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------
import { noTextComponent } from './rules/no-text-component';
import { noThrow } from './rules/no-throw';

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------
const allRules = {
    'no-text-component': noTextComponent,
    'no-throw': noThrow,
};

const configureAsError = (rules: typeof allRules) => {
    const result: Record<string, 2> = {};
    for (const key in rules) {
        if (Object.prototype.hasOwnProperty.call(rules, key)) {
            result[`@tokenstreet/${key}`] = 2;
        }
    }
    return result;
};

// import all rules in lib/rules
module.exports = {
    rules: allRules,
    configs: {
        all: {
            plugins: ['@tokenstreet'],
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
            rules: configureAsError(allRules),
        },
    },
};
