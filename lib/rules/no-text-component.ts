/**
 * @fileoverview We use our Typography component to display text, which for example preconfigures the font family and other properties. Therefore, this component should always be used instead of the text component.
 * @author Daniel Reichhart <daniel@tokenstreet.com>
 */
import { Rule } from 'eslint';

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/**
 * @type {import('eslint').Rule.RuleModule}
 */
export const noTextComponent: Rule.RuleModule = {
    meta: {
        type: 'suggestion', // `problem`, `suggestion`, or `layout`
        docs: {
            description:
                'We use our Typography component to display text, which for example preconfigures the font family and other properties. Therefore, this component should always be used instead of the text component.',
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

            JSXElement(node: any) {
                const name = node.openingElement.name.name;
                if (name === 'Text') {
                    context.report({
                        node,
                        message:
                            'The react-native Text component is not allowed. Please use the custom <Typography /> component.',
                    });
                }
            },
        };
    },
};
