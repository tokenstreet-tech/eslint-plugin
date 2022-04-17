/**
 * @fileoverview We use our Typography component to display text, which for example preconfigures the font family and other properties. Therefore, this component should always be used instead of the text component.
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
export const noTextComponent: Rule.RuleModule = {
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

            JSXElement: (node: Node): void => {
                const createReport = (foundComponent: string, replacementComponent: string): void => {
                    context.report({
                        data: { foundComponent, replacementComponent },
                        message:
                            'The react-native <{{ foundComponent }} /> component is not allowed. Please use the custom <{{ replacementComponent }} /> component.',
                        node,
                    });
                };

                // @ts-expect-error JSXElement does not exist the estree type declarations
                const isTextComponent = node.openingElement.name.name === 'Text';
                const isAnimatedTextComponent =
                    // @ts-expect-error JSXElement does not exist the estree type declarations
                    node.openingElement.name.object?.name === 'Animated' &&
                    // @ts-expect-error JSXElement does not exist the estree type declarations
                    node.openingElement.name.property?.name === 'Text';
                if (isTextComponent) {
                    createReport('Text', 'Typography');
                } else if (isAnimatedTextComponent) {
                    createReport('Animated.Text', 'Typography.Animated');
                }
            },
        }),
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
