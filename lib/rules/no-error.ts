/**
 * @fileoverview
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
export const noError: Rule.RuleModule = {
    meta: {
        type: 'suggestion', // `problem`, `suggestion`, or `layout`
        docs: {
            description: "Forbid the use of all 'Error' classes.",
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

            NewExpression(node: any) {
                const errorClasses: Array<string> = [
                    'Error',
                    'EvalError',
                    'InternalError',
                    'RangeError',
                    'ReferenceError',
                    'SyntaxError',
                    'TypeError',
                    'URIError',
                ];
                const isErrorExpression = errorClasses.some((value) => value === node.callee.name);
                if (isErrorExpression)
                    context.report({
                        node,
                        message: "Unallowed use of a error class. Please use the 'ErrorHandler'",
                    });
            },
        };
    },
};
