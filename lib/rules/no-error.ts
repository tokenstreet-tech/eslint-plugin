/**
 * @fileoverview
 * We use our `ErrorHandler` to handle warnings, errors and fatal errors,
 * which reacts appropriately and unified to the severity.
 * Therefore, this handler should always be used instead of throwing an error yourself.
 *
 * @author Daniel Reichhart <daniel@tokenstreet.com>
 */
import type { Rule } from 'eslint';
import type { Node } from 'estree';

/*
 * ------------------------------------------------------------------------------
 *  Rule Definition
 * ------------------------------------------------------------------------------
 */

/**
 * @type {import('eslint').Rule.RuleModule}
 */
export const noError: Rule.RuleModule = {
    create: (context: Rule.RuleContext) =>
        // Variables should be defined here

        /*
         * ----------------------------------------------------------------------
         *  Helpers
         * ----------------------------------------------------------------------
         */

        // Any helper functions should go here or else delete this section

        /*
         * ----------------------------------------------------------------------
         *  Public
         * ----------------------------------------------------------------------
         */
        ({
            // Visitor functions for different types of nodes
            NewExpression: (node: Node): void => {
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
                if ('callee' in node) {
                    // @ts-expect-error Name does not exist in the type declaration
                    const isErrorExpression = errorClasses.some((value) => value === node.callee.name);
                    if (isErrorExpression)
                        context.report({
                            message: "Unallowed use of a error class. Please use the 'ErrorHandler' instead.",
                            node,
                        });
                }
            },
        }),
    meta: {
        docs: {
            category: undefined,
            description: 'Forbid the use of all error classes.',
            recommended: true,
            url: undefined, // URL to the documentation page for this rule
        },
        fixable: undefined, // Or `code` or `whitespace`
        schema: [], // Add a schema if the rule has options
        type: 'suggestion', // `problem`, `suggestion`, or `layout`
    },
};
