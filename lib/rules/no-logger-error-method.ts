/**
 * @fileoverview
 * The logger methods `warn`, `error` and `fatal` should not be used directly.
 * Instead, one should call the `ErrorHandler`, which reacts appropriately to the status and calls the `Logger`.
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
export const noLoggerErrorMethod: Rule.RuleModule = {
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

            MemberExpression: (node: Node): void => {
                const loggerErrorMethods: Array<string> = ['warn', 'error', 'fatal'];
                if ('object' in node && 'name' in node.object && 'property' in node) {
                    const isLoggerErrorMethod =
                        node.object.name === 'Logger' &&
                        // @ts-expect-error Name does not exist in the type declaration
                        loggerErrorMethods.some((value) => value === node.property.name);
                    if (isLoggerErrorMethod)
                        context.report({
                            message: "Unallowed use of a logger error method. Please use the 'ErrorHandler' instead.",
                            node,
                        });
                }
            },
        }),
    meta: {
        docs: {
            category: undefined,
            description: 'Forbid the use of logger error methods.',
            recommended: true,
            url: undefined, // URL to the documentation page for this rule
        },
        fixable: undefined, // Or `code` or `whitespace`
        schema: [], // Add a schema if the rule has options
        type: 'suggestion', // `problem`, `suggestion`, or `layout`
    },
};
