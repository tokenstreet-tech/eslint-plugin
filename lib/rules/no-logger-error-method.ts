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
    meta: {
        type: 'suggestion', // `problem`, `suggestion`, or `layout`
        docs: {
            description: 'Forbid the use of logger error methods.',
            category: undefined,
            recommended: true,
            url: undefined, // URL to the documentation page for this rule
        },
        fixable: undefined, // Or `code` or `whitespace`
        schema: [], // Add a schema if the rule has options
    },

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

            MemberExpression(node: any) {
                const loggerErrorMethods: Array<string> = ['warn', 'error', 'fatal'];
                const isLoggerErrorMethod =
                    node.object.name === 'Logger' && loggerErrorMethods.some((value) => value === node.property.name);
                if (isLoggerErrorMethod)
                    context.report({
                        node,
                        message: "Unallowed use of a logger error method. Please use the 'ErrorHandler' instead.",
                    });
            },
        };
    },
};
