/**
 * @fileoverview Detects unused styles
 * @author Daniel Reichhart <daniel@tokenstreet.com>
 */

import Components from '../util/Components';
import { Rule } from 'eslint';

/**
 * StyleSheets represents the StyleSheets found in the source code.
 */
export class StyleSheets {
    private styleSheets: any = {};

    /**
     * Add adds a StyleSheet to our StyleSheets collections.
     *
     * @param {string} styleSheetName - The name of the StyleSheet.
     * @param {object} properties - The collection of rules in the styleSheet.
     */
    add(styleSheetName: string, properties: any) {
        this.styleSheets[styleSheetName] = properties;
    }

    /**
     * MarkAsUsed marks a rule as used in our source code by removing it from the
     * specified StyleSheet rules.
     *
     * @param {string} fullyQualifiedName - The fully qualified name of the rule.
     * for example 'styles.text'
     */
    markAsUsed(fullyQualifiedName: string) {
        const nameSplit = fullyQualifiedName.split('.');
        const styleSheetName = nameSplit[0];
        const styleSheetProperty = nameSplit[1];

        if (this.styleSheets[styleSheetName]) {
            this.styleSheets[styleSheetName] = this.styleSheets[styleSheetName].filter(
                (property: any) => property.key.name !== styleSheetProperty
            );
        }
    }

    /**
     * GetUnusedReferences returns all collected StyleSheets and their
     * unmarked rules.
     */
    getUnusedReferences() {
        return this.styleSheets;
    }
}

export const noUnusedStyles: Rule.RuleModule = {
    meta: {
        schema: [],
    },
    create: Components.detect((context: Rule.RuleContext, components: any) => {
        const styleSheets = new StyleSheets();
        const styleReferences = new Set<string>();

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

        const containsStyleSheetObject = (node: any, objectNames: any) =>
            Boolean(
                node &&
                    node.type === 'CallExpression' &&
                    node.callee &&
                    node.callee.object &&
                    node.callee.object.name &&
                    objectNames.includes(node.callee.object.name)
            );

        const containsCreateCall = (node: any) =>
            Boolean(node && node.callee && node.callee.property && node.callee.property.name === 'create');

        const isStyleSheetDeclaration = (node: any, settings: any) => {
            const getStyleSheetObjectNames = (settings: any) =>
                settings['react-native/style-sheet-object-names'] || ['StyleSheet'];
            const objectNames = getStyleSheetObjectNames(settings);

            return Boolean(containsStyleSheetObject(node, objectNames) && containsCreateCall(node));
        };

        const getStyleSheetName = (node: any) => {
            if (node && node.parent && node.parent.id) {
                return node.parent.id.name;
            }
        };

        const getStyleDeclarations = (node: any) => {
            if (
                node &&
                node.type === 'CallExpression' &&
                node.arguments &&
                node.arguments[0] &&
                node.arguments[0].properties
            ) {
                return node.arguments[0].properties.filter((property: any) => property.type === 'Property');
            }

            return [];
        };

        const getPotentialStyleReferenceFromMemberExpression = (node: any) => {
            if (
                node &&
                node.object &&
                node.object.type === 'Identifier' &&
                node.object.name &&
                node.property &&
                node.property.type === 'Identifier' &&
                node.property.name &&
                node.parent.type !== 'MemberExpression'
            ) {
                return [node.object.name, node.property.name].join('.');
            }
        };

        return {
            // Style refs
            MemberExpression: (node: any) => {
                const styleRef = getPotentialStyleReferenceFromMemberExpression(node);
                if (styleRef) {
                    styleReferences.add(styleRef);
                }
            },
            // Stylesheets
            CallExpression: (node: any) => {
                if (isStyleSheetDeclaration(node, context.settings)) {
                    const styleSheetName = getStyleSheetName(node);
                    const styles = getStyleDeclarations(node);

                    styleSheets.add(styleSheetName, styles);
                }
            },
            'Program:exit': () => {
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
