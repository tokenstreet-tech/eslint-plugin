/**
 * StyleSheets represents the StyleSheets found in the source code.
 * @constructor
 */
function StyleSheets() {
    this.styleSheets = {};
}

/**
 * Add adds a StyleSheet to our StyleSheets collections.
 *
 * @param {string} styleSheetName - The name of the StyleSheet.
 * @param {object} properties - The collection of rules in the styleSheet.
 */
StyleSheets.prototype.add = function (styleSheetName: any, properties: any) {
    this.styleSheets[styleSheetName] = properties;
};

/**
 * MarkAsUsed marks a rule as used in our source code by removing it from the
 * specified StyleSheet rules.
 *
 * @param {string} fullyQualifiedName - The fully qualified name of the rule.
 * for example 'styles.text'
 */
StyleSheets.prototype.markAsUsed = function (fullyQualifiedName: any) {
    const nameSplit = fullyQualifiedName.split('.');
    const styleSheetName = nameSplit[0];
    const styleSheetProperty = nameSplit[1];

    if (this.styleSheets[styleSheetName]) {
        this.styleSheets[styleSheetName] = this.styleSheets[styleSheetName].filter(
            (property: any) => property.key.name !== styleSheetProperty
        );
    }
};

/**
 * GetUnusedReferences returns all collected StyleSheets and their
 * unmarked rules.
 */
StyleSheets.prototype.getUnusedReferences = function () {
    return this.styleSheets;
};

/**
 * AddColorLiterals adds an array of expressions that contain color literals
 * to the ColorLiterals collection
 * @param {array} expressions - an array of expressions containing color literals
 */
StyleSheets.prototype.addColorLiterals = function (expressions: any) {
    if (!this.colorLiterals) {
        this.colorLiterals = [];
    }
    this.colorLiterals = this.colorLiterals.concat(expressions);
};

/**
 * GetColorLiterals returns an array of collected color literals expressions
 * @returns {Array}
 */
StyleSheets.prototype.getColorLiterals = function () {
    return this.colorLiterals;
};

/**
 * AddObjectexpressions adds an array of expressions to the ObjectExpressions collection
 * @param {Array} expressions - an array of expressions containing ObjectExpressions in
 * inline styles
 */
StyleSheets.prototype.addObjectExpressions = function (expressions: any) {
    if (!this.objectExpressions) {
        this.objectExpressions = [];
    }
    this.objectExpressions = this.objectExpressions.concat(expressions);
};

/**
 * GetObjectExpressions returns an array of collected object expressiosn used in inline styles
 * @returns {Array}
 */
StyleSheets.prototype.getObjectExpressions = function () {
    return this.objectExpressions;
};

export { StyleSheets };
