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
    add(styleSheetName: any, properties: any) {
        this.styleSheets[styleSheetName] = properties;
    }

    /**
     * MarkAsUsed marks a rule as used in our source code by removing it from the
     * specified StyleSheet rules.
     *
     * @param {string} fullyQualifiedName - The fully qualified name of the rule.
     * for example 'styles.text'
     */
    markAsUsed(fullyQualifiedName: any) {
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
