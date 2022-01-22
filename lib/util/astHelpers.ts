export const astHelpers = {
    containsStyleSheetObject: function (node: any, objectNames: any) {
        return Boolean(
            node &&
                node.type === 'CallExpression' &&
                node.callee &&
                node.callee.object &&
                node.callee.object.name &&
                objectNames.includes(node.callee.object.name)
        );
    },

    containsCreateCall: (node: any) =>
        Boolean(node && node.callee && node.callee.property && node.callee.property.name === 'create'),
    isStyleSheetDeclaration: function (node: any, settings: any) {
        const getStyleSheetObjectNames = (settings: any) =>
            settings['react-native/style-sheet-object-names'] || ['StyleSheet'];
        const objectNames = getStyleSheetObjectNames(settings);

        return Boolean(astHelpers.containsStyleSheetObject(node, objectNames) && astHelpers.containsCreateCall(node));
    },

    getStyleSheetName: function (node: any) {
        if (node && node.parent && node.parent.id) {
            return node.parent.id.name;
        }
    },

    getStyleDeclarations: function (node: any) {
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
    },

    getExpressionIdentifier: function (node: any) {
        if (node) {
            switch (node.type) {
                case 'Identifier':
                    return node.name;
                case 'Literal':
                    return node.value;
                case 'TemplateLiteral':
                    return node.quasis.reduce(
                        (result: any, quasi: any, index: any) =>
                            result + quasi.value.cooked + astHelpers.getExpressionIdentifier(node.expressions[index]),
                        ''
                    );
                default:
                    return '';
            }
        }

        return '';
    },

    getStyleReferenceFromNode: function (node: any): any {
        let styleReference;
        let leftStyleReferences;
        let rightStyleReferences;

        if (!node) {
            return [];
        }

        switch (node.type) {
            case 'MemberExpression':
                styleReference = astHelpers.getStyleReferenceFromExpression(node);
                return [styleReference];
            case 'LogicalExpression':
                leftStyleReferences = astHelpers.getStyleReferenceFromNode(node.left);
                rightStyleReferences = astHelpers.getStyleReferenceFromNode(node.right);
                return [].concat(leftStyleReferences).concat(rightStyleReferences);
            case 'ConditionalExpression':
                leftStyleReferences = astHelpers.getStyleReferenceFromNode(node.consequent);
                rightStyleReferences = astHelpers.getStyleReferenceFromNode(node.alternate);
                return [].concat(leftStyleReferences).concat(rightStyleReferences);
            default:
                return [];
        }
    },

    getStyleObjectExpressionFromNode: function (node: any): any {
        let leftStyleObjectExpression;
        let rightStyleObjectExpression;

        if (!node) {
            return [];
        }

        if (node.type === 'ObjectExpression') {
            return [astHelpers.getStyleObjectFromExpression(node)];
        }

        switch (node.type) {
            case 'LogicalExpression':
                leftStyleObjectExpression = astHelpers.getStyleObjectExpressionFromNode(node.left);
                rightStyleObjectExpression = astHelpers.getStyleObjectExpressionFromNode(node.right);
                return [].concat(leftStyleObjectExpression).concat(rightStyleObjectExpression);
            case 'ConditionalExpression':
                leftStyleObjectExpression = astHelpers.getStyleObjectExpressionFromNode(node.consequent);
                rightStyleObjectExpression = astHelpers.getStyleObjectExpressionFromNode(node.alternate);
                return [].concat(leftStyleObjectExpression).concat(rightStyleObjectExpression);
            default:
                return [];
        }
    },

    getColorLiteralsFromNode: function (node: any): any {
        let leftColorLiterals;
        let rightColorLiterals;

        if (!node) {
            return [];
        }

        if (node.type === 'ObjectExpression') {
            return [astHelpers.getColorLiteralsFromExpression(node)];
        }

        switch (node.type) {
            case 'LogicalExpression':
                leftColorLiterals = astHelpers.getColorLiteralsFromNode(node.left);
                rightColorLiterals = astHelpers.getColorLiteralsFromNode(node.right);
                return [].concat(leftColorLiterals).concat(rightColorLiterals);
            case 'ConditionalExpression':
                leftColorLiterals = astHelpers.getColorLiteralsFromNode(node.consequent);
                rightColorLiterals = astHelpers.getColorLiteralsFromNode(node.alternate);
                return [].concat(leftColorLiterals).concat(rightColorLiterals);
            default:
                return [];
        }
    },

    getStyleReferenceFromExpression: function (node: any) {
        const result = [];
        const name = astHelpers.getObjectName(node);
        if (name) {
            result.push(name);
        }

        const property = astHelpers.getPropertyName(node);
        if (property) {
            result.push(property);
        }

        return result.join('.');
    },

    getStyleObjectFromExpression: function (node: any) {
        const obj: any = {};
        let invalid = false;
        if (node.properties && node.properties.length) {
            node.properties.forEach((p: any) => {
                if (!p.value || !p.key) {
                    return;
                }
                if (p.value.type === 'Literal') {
                    invalid = true;
                    obj[p.key.name] = p.value.value;
                } else if (p.value.type === 'ConditionalExpression') {
                    const innerNode = p.value;
                    if (innerNode.consequent.type === 'Literal' || innerNode.alternate.type === 'Literal') {
                        invalid = true;
                    }
                } else if (
                    p.value.type === 'UnaryExpression' &&
                    p.value.operator === '-' &&
                    p.value.argument.type === 'Literal'
                ) {
                    invalid = true;
                    obj[p.key.name] = -1 * p.value.argument.value;
                } else if (
                    p.value.type === 'UnaryExpression' &&
                    p.value.operator === '+' &&
                    p.value.argument.type === 'Literal'
                ) {
                    invalid = true;
                    obj[p.key.name] = p.value.argument.value;
                }
            });
        }
        return invalid ? { expression: obj, node: node } : undefined;
    },

    getColorLiteralsFromExpression: function (node: any) {
        const obj: any = {};
        let invalid = false;
        if (node.properties && node.properties.length) {
            node.properties.forEach((p: any) => {
                if (p.key && p.key.name && p.key.name.toLowerCase().indexOf('color') !== -1) {
                    if (p.value.type === 'Literal') {
                        invalid = true;
                        obj[p.key.name] = p.value.value;
                    } else if (p.value.type === 'ConditionalExpression') {
                        const innerNode = p.value;
                        if (innerNode.consequent.type === 'Literal' || innerNode.alternate.type === 'Literal') {
                            invalid = true;
                        }
                    }
                }
            });
        }
        return invalid ? { expression: obj, node: node } : undefined;
    },

    getObjectName: function (node: any) {
        if (node && node.object && node.object.name) {
            return node.object.name;
        }
    },

    getPropertyName: function (node: any) {
        if (node && node.property && node.property.name) {
            return node.property.name;
        }
    },

    getPotentialStyleReferenceFromMemberExpression: function (node: any) {
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
    },
};
