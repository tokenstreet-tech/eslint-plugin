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

export const isStyleSheetDeclaration = (node: any, settings: any) => {
    const getStyleSheetObjectNames = (settings: any) =>
        settings['react-native/style-sheet-object-names'] || ['StyleSheet'];
    const objectNames = getStyleSheetObjectNames(settings);

    return Boolean(containsStyleSheetObject(node, objectNames) && containsCreateCall(node));
};

export const getStyleSheetName = (node: any) => {
    if (node && node.parent && node.parent.id) {
        return node.parent.id.name;
    }
};

export const getStyleDeclarations = (node: any) => {
    if (node && node.type === 'CallExpression' && node.arguments && node.arguments[0] && node.arguments[0].properties) {
        return node.arguments[0].properties.filter((property: any) => property.type === 'Property');
    }

    return [];
};

export const getPotentialStyleReferenceFromMemberExpression = (node: any) => {
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
