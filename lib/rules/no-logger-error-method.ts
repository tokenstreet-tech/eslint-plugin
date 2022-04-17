/**
 * @fileoverview
 * The logger methods "warn", "error" and "fatal" should not be used directly.
 * Instead, one should call the ErrorHandler, which reacts appropriately to the status and calls the logger.
 *
 * @author Daniel Reichhart <daniel@tokenstreet.com>
 */
import type { Rule } from 'eslint';

/*
 * ------------------------------------------------------------------------------
 *  Rule Definition
 * ------------------------------------------------------------------------------
 */

/**
 * @type {import('eslint').Rule.RuleModule}
 */
export const noLoggerErrorMethod: Rule.RuleModule = {
    create(context: Rule.RuleContext) {
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

        return {
            // Visitor functions for different types of nodes

            MemberExpression(node: any): void {
                const loggerErrorMethods: Array<string> = ['warn', 'error', 'fatal'];
                const isLoggerErrorMethod =
                    node.object.name === 'Logger' && loggerErrorMethods.some((value) => value === node.property.name);
                if (isLoggerErrorMethod)
                    context.report({
                        message: "Unallowed use of a logger error method. Please use the 'ErrorHandler' instead.",
                        node,
                    });
            },
        };
    },
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
