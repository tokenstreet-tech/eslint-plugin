/**
 * @fileoverview Detects unused styles
 * @author Daniel Reichhart <daniel@tokenstreet.com>
 */

import { StyleSheets } from '../util/StyleSheet';
import Components from '../util/Components';
import { astHelpers } from '../util/astHelpers';
import { Rule } from 'eslint';

export const noUnusedStyles: Rule.RuleModule = {
    meta: {
        schema: [],
    },
    create: Components.detect((context: Rule.RuleContext, components: any) => {
        const styleSheets = new StyleSheets();
        const styleReferences = new Set();

        function reportUnusedStyles(unusedStyles: any) {
            Object.keys(unusedStyles).forEach((key) => {
                if ({}.hasOwnProperty.call(unusedStyles, key)) {
                    const styles = unusedStyles[key];
                    styles.forEach((node: any) => {
                        const message = ['Unused style detected: ', key, '.', node.key.name].join('');

                        context.report({ node, message });
                    });
                }
            });
        }

        return {
            MemberExpression: function (node: any) {
                const styleRef = astHelpers.getPotentialStyleReferenceFromMemberExpression(node);
                if (styleRef) {
                    styleReferences.add(styleRef);
                }
            },

            CallExpression: function (node: any) {
                if (astHelpers.isStyleSheetDeclaration(node, context.settings)) {
                    const styleSheetName = astHelpers.getStyleSheetName(node);
                    const styles = astHelpers.getStyleDeclarations(node);

                    styleSheets.add(styleSheetName, styles);
                }
            },

            'Program:exit': function () {
                const list = components.all();
                if (Object.keys(list).length > 0) {
                    styleReferences.forEach((reference) => {
                        styleSheets.markAsUsed(reference);
                    });
                    reportUnusedStyles(styleSheets.getUnusedReferences());
                }
            },
        };
    }),
};
