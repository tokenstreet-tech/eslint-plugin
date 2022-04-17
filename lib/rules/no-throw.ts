/**
 * @fileoverview
 * We use the ErrorHandler to handle warnings, errors and fatal errors,
 * which reacts appropriately and unified to the severity.
 * Therefore, this should always be used instead of throwing an error yourself.
 *
 * @author Daniel Reichhart <daniel@tokenstreet.com>
 */
import type { Rule } from 'eslint';
import type { Node } from 'estree';
import type { DeepReadonly } from 'ts-essentials';

/*
 * ------------------------------------------------------------------------------
 *  Rule Definition
 * ------------------------------------------------------------------------------
 */

/**
 * @type {import('eslint').Rule.RuleModule}
 */
export const noThrow: Rule.RuleModule = {
    create(context: DeepReadonly<Rule.RuleContext>) {
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

            ThrowStatement(node: Node): void {
                context.report({
                    message: "Unallowed use of 'throw'. Please use the 'ErrorHandler' instead.",
                    node,
                });
            },
        };
    },
    meta: {
        docs: {
            category: undefined,
            description: "Forbid the use of 'throw'.",
            recommended: true,
            url: undefined, // URL to the documentation page for this rule
        },
        fixable: undefined, // Or `code` or `whitespace`
        schema: [], // Add a schema if the rule has options
        type: 'suggestion', // `problem`, `suggestion`, or `layout`
    },
};
