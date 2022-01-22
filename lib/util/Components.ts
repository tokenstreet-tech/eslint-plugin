/**
 * @fileoverview Utility class and functions for React components detection
 * @author Daniel Reichhart <daniel@tokenstreet.com>
 */

/**
 * Components
 * @class
 */
function Components() {
    this.list = {};
    this.getId = function (node: any) {
        return node && node.range.join(':');
    };
}

/**
 * Add a node to the components list, or update it if it's already in the list
 *
 * @param {ASTNode} node The AST node being added.
 * @param {Number} confidence Confidence in the component detection (0=banned, 1=maybe, 2=yes)
 */
Components.prototype.add = function (node: any, confidence: any) {
    const id = this.getId(node);
    if (this.list[id]) {
        if (confidence === 0 || this.list[id].confidence === 0) {
            this.list[id].confidence = 0;
        } else {
            this.list[id].confidence = Math.max(this.list[id].confidence, confidence);
        }
        return;
    }
    this.list[id] = {
        node: node,
        confidence: confidence,
    };
};

/**
 * Return the components list
 * Components for which we are not confident are not returned
 *
 * @returns {Object} Components list
 */
Components.prototype.all = function () {
    const list: any = {};
    Object.keys(this.list).forEach((i) => {
        if ({}.hasOwnProperty.call(this.list, i) && this.list[i].confidence >= 2) {
            list[i] = this.list[i];
        }
    });
    return list;
};

function componentRule(rule: any, context: any) {
    const sourceCode = context.getSourceCode();
    const components = new Components();

    // Utilities for component detection
    const utils = {
        /**
         * Check if the node is a React ES5 component
         *
         * @param {ASTNode} node The AST node being checked.
         * @returns {Boolean} True if the node is a React ES5 component, false if not
         */
        isES5Component: function (node: any) {
            if (!node.parent) {
                return false;
            }
            return /^(React\.)?createClass$/.test(sourceCode.getText(node.parent.callee));
        },

        /**
         * Check if the node is a React ES6 component
         *
         * @param {ASTNode} node The AST node being checked.
         * @returns {Boolean} True if the node is a React ES6 component, false if not
         */
        isES6Component: function (node: any) {
            if (!node.superClass) {
                return false;
            }
            return /^(React\.)?(Pure)?Component$/.test(sourceCode.getText(node.superClass));
        },

        /**
         * Check if the node is returning JSX
         *
         * @param {ASTNode} node The AST node being checked (must be a ReturnStatement).
         * @returns {Boolean} True if the node is returning JSX, false if not
         */
        isReturningJSX: function (node: any) {
            let property;
            switch (node.type) {
                case 'ReturnStatement':
                    property = 'argument';
                    break;
                case 'ArrowFunctionExpression':
                    property = 'body';
                    break;
                default:
                    return false;
            }

            const returnsJSX =
                node[property] && (node[property].type === 'JSXElement' || node[property].type === 'JSXFragment');
            const returnsReactCreateElement =
                node[property] &&
                node[property].callee &&
                node[property].callee.property &&
                node[property].callee.property.name === 'createElement';
            return Boolean(returnsJSX || returnsReactCreateElement);
        },

        /**
         * Get the parent component node from the current scope
         *
         * @returns {ASTNode} component node, null if we are not in a component
         */
        getParentComponent: function () {
            return (
                utils.getParentES6Component() || utils.getParentES5Component() || utils.getParentStatelessComponent()
            );
        },

        /**
         * Get the parent ES5 component node from the current scope
         *
         * @returns {ASTNode} component node, null if we are not in a component
         */
        getParentES5Component: function () {
            let scope = context.getScope();
            while (scope) {
                const node = scope.block && scope.block.parent && scope.block.parent.parent;
                if (node && utils.isES5Component(node)) {
                    return node;
                }
                scope = scope.upper;
            }
            return null;
        },

        /**
         * Get the parent ES6 component node from the current scope
         *
         * @returns {ASTNode} component node, null if we are not in a component
         */
        getParentES6Component: function () {
            let scope = context.getScope();
            while (scope && scope.type !== 'class') {
                scope = scope.upper;
            }
            const node = scope && scope.block;
            if (!node || !utils.isES6Component(node)) {
                return null;
            }
            return node;
        },

        /**
         * Get the parent stateless component node from the current scope
         *
         * @returns {ASTNode} component node, null if we are not in a component
         */
        getParentStatelessComponent: function () {
            let scope = context.getScope();
            while (scope) {
                const node = scope.block;
                // Ignore non functions
                const isFunction = /Function/.test(node.type);
                // Ignore classes methods
                const isNotMethod = !node.parent || node.parent.type !== 'MethodDefinition';
                // Ignore arguments (callback, etc.)
                const isNotArgument = !node.parent || node.parent.type !== 'CallExpression';
                if (isFunction && isNotMethod && isNotArgument) {
                    return node;
                }
                scope = scope.upper;
            }
            return null;
        },
    };

    // Component detection instructions
    const detectionInstructions = {
        ArrowFunctionExpression: function () {
            const node = utils.getParentComponent();
            if (!node) {
                return;
            }
            if (node.expression && utils.isReturningJSX(node)) {
                components.add(node, 2);
            } else {
                components.add(node, 1);
            }
        },
        ReturnStatement: function (node: any) {
            if (!utils.isReturningJSX(node)) {
                return;
            }
            const parentNode = utils.getParentComponent();
            if (!parentNode) {
                return;
            }
            components.add(parentNode, 2);
        },
    };

    // Update the provided rule instructions to add the component detection
    const ruleInstructions = rule(context, components, utils);
    const updatedRuleInstructions = { ...ruleInstructions };
    Object.keys(detectionInstructions).forEach((instruction) => {
        updatedRuleInstructions[instruction] = (node: any) => {
            detectionInstructions[instruction](node);
            return ruleInstructions[instruction] ? ruleInstructions[instruction](node) : undefined;
        };
    });
    // Return the updated rule instructions
    return updatedRuleInstructions;
}

Components.detect = function (rule: any) {
    return componentRule.bind(this, rule);
};

export default Components;
