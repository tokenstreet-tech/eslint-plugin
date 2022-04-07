/**
 * @fileoverview
 * We use the ErrorHandler to handle warnings, errors and fatal errors,
 * which reacts appropriately and unified to the severity.
 * Therefore, this should always be used instead of throwing an error yourself.
 *
 * @author Daniel Reichhart <daniel@tokenstreet.com>
 */
import { Rule } from 'eslint';

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/**
 * @type {import('eslint').Rule.RuleModule}
 */
export const noThrow: Rule.RuleModule = {
    meta: {
        type: 'suggestion', // `problem`, `suggestion`, or `layout`
        docs: {
            description: "Forbid the use of 'throw'.",
            category: undefined,
            recommended: true,
            url: undefined, // URL to the documentation page for this rule
        },
        fixable: undefined, // Or `code` or `whitespace`
        schema: [], // Add a schema if the rule has options
    },

    create(context: Rule.RuleContext) {
        // variables should be defined here

        //----------------------------------------------------------------------
        // Helpers
        //----------------------------------------------------------------------

        // any helper functions should go here or else delete this section

        //----------------------------------------------------------------------
        // Public
        //----------------------------------------------------------------------

        return {
            // visitor functions for different types of nodes

            ThrowStatement(node) {
                context.report({
                    node,
                    message: "Unallowed use of 'throw'. Please use the 'ErrorHandler'",
                });
            },
        };
    },
};
