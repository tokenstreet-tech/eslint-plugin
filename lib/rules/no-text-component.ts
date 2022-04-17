/**
 * @fileoverview We use our Typography component to display text, which for example preconfigures the font family and other properties. Therefore, this component should always be used instead of the text component.
 * @author Daniel Reichhart <daniel@tokenstreet.com>
 */
import type { Rule } from 'eslint';
import type { DeepReadonly } from 'ts-essentials';

/*
 * ------------------------------------------------------------------------------
 *  Rule Definition
 * ------------------------------------------------------------------------------
 */

/**
 * @type {import('eslint').Rule.RuleModule}
 */
export const noTextComponent: Rule.RuleModule = {
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

            JSXElement(node: any): void {
                const createReport = (foundComponent: string, replacementComponent: string): any => {
                    context.report({
                        data: { foundComponent, replacementComponent },
                        message:
                            'The react-native <{{ foundComponent }} /> component is not allowed. Please use the custom <{{ replacementComponent }} /> component.',
                        node,
                    });
                };

                const isTextComponent = node.openingElement.name.name === 'Text';
                const isAnimatedTextComponent =
                    node.openingElement.name.object?.name === 'Animated' &&
                    node.openingElement.name.property?.name === 'Text';
                if (isTextComponent) {
                    createReport('Text', 'Typography');
                } else if (isAnimatedTextComponent) {
                    createReport('Animated.Text', 'Typography.Animated');
                }
            },
        };
    },
    meta: {
        docs: {
            category: undefined,
            description:
                'We use our Typography component to display text, which for example preconfigures the font family and other properties. Therefore, this component should always be used instead of the text component.',
            recommended: true,
            url: undefined, // URL to the documentation page for this rule
        },
        fixable: undefined, // Or `code` or `whitespace`
        schema: [], // Add a schema if the rule has options
        type: 'suggestion', // `problem`, `suggestion`, or `layout`
    },
};
