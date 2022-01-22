/**
 * @fileoverview Detects unused styles
 * @author Daniel Reichhart <daniel@tokenstreet.com>
 */

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------
import { noUnusedStyles } from '../../../lib/rules/no-unused-styles';
import { RuleTester } from 'eslint';

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = new RuleTester({
    parserOptions: {
        ecmaVersion: 13,
        ecmaFeatures: {
            jsx: true,
        },
        sourceType: 'module',
        allowImportExportEverywhere: true,
    },
    settings: {
        'react-native/style-sheet-object-names': ['StyleSheet', 'EStyleSheet'],
    },
});
ruleTester.run('no-unused-styles', noUnusedStyles, {
    valid: [
        {
            name: 'Function component',
            code:
                'function Hello() {\n' +
                '    return <Text style={styles.name}>Hello</Text>;\n' +
                '}\n' +
                'const styles = StyleSheet.create({ name: {} });\n',
        },
        {
            name: 'Anonymous function component',
            code:
                'const Hello = function () {\n' +
                '    return <Text style={styles.name}>Hello</Text>;\n' +
                '};\n' +
                'const styles = StyleSheet.create({ name: {} });\n',
        },
        {
            name: 'Arrow function component',
            code:
                'const Hello = () => <Text style={styles.name}>Hello</Text>;\n' +
                'const styles = StyleSheet.create({ name: {} });\n',
        },
        {
            name: 'Component declared after the styles',
            code:
                'const styles = StyleSheet.create({ name: {} });\n' +
                'const Hello = () => <Text style={styles.name}>Hello</Text>;\n',
        },
        {
            name: 'Multiple style objects',
            code:
                'const styles = StyleSheet.create({ name: {},  welcome: {} });\n' +
                'const Hello = () => <Text style={styles.name}>Hello</Text>;\n' +
                'const Welcome = () => <Text style={styles.welcome}>Welcome</Text>;\n',
        },
        {
            name: 'Style object passed as a variable',
            code:
                'const styles = StyleSheet.create({ name: {} });\n' +
                'const Hello = ({ textStyle }) => <Text style={[styles.name, textStyle]}>Hello</Text>;\n',
        },
        {
            name: 'Style objects from different style sheets',
            code:
                'const styles = StyleSheet.create({ name: {} });\n' +
                'const styles2 = StyleSheet.create({ name: {} });\n' +
                'const Hello = () => <Text style={[styles.name, styles2.name]}>Hello</Text>;\n',
        },
        {
            name: 'Conditional style objects (positive)',
            code:
                'const styles = StyleSheet.create({ name: {} });\n' +
                'const Hello = ({condition = true}) => <Text style={condition && styles.name}>Hello</Text>;\n',
        },
        {
            name: 'Conditional style objects (negative)',
            code:
                'const styles = StyleSheet.create({ name: {} });\n' +
                'const Hello = ({condition = false}) => <Text style={condition && styles.name}>Hello</Text>;\n',
        },
        {
            name: 'Conditional style objects inside an array (positive)',
            code:
                'const styles = StyleSheet.create({ name: {} });\n' +
                'const Hello = ({condition = true}) => <Text style={[condition && styles.name]}>Hello</Text>;\n',
        },
        {
            name: 'Conditional style objects inside an array (negative)',
            code:
                'const styles = StyleSheet.create({ name: {} });\n' +
                'const Hello = ({condition = false}) => <Text style={[condition && styles.name]}>Hello</Text>;\n',
        },
        {
            name: 'Ternary operator',
            code:
                'const styles = StyleSheet.create({ name: {}, welcome: {} });\n' +
                'const Hello = ({ condition = true }) => <Text style={condition ? styles.name : styles.welcome}>Hello</Text>;\n',
        },
        {
            name: 'Ternary operator inside an array',
            code:
                'const styles = StyleSheet.create({ name: {}, welcome: {} });\n' +
                'const Hello = ({ condition = true }) => <Text style={[condition ? styles.name : styles.welcome]}>Hello</Text>;\n',
        },
        {
            name: 'createClass syntax',
            code:
                'const styles = StyleSheet.create({ name: {} });\n' +
                'const Hello = React.createClass({ render: () => <Text style={styles.name}>Hello</Text> });\n',
        },
        {
            name: 'Class component syntax',
            code:
                'const styles = StyleSheet.create({ name: {} });\n' +
                'class Hello extends Component {\n' +
                '    render() {\n' +
                '        return <Text style={styles.name}>Hello</Text>;\n' +
                '    }\n' +
                '}\n',
        },
        {
            name: 'Pure component syntax',
            code:
                'const styles = StyleSheet.create({ name: {} });\n' +
                'class Hello extends PureComponent {\n' +
                '    render() {\n' +
                '        return <Text style={styles.name}>Hello</Text>;\n' +
                '    }\n' +
                '}\n',
        },
        {
            name: 'Memoized function component',
            code:
                'const Hello = memo(() => <Text style={styles.name}>Hello</Text>);\n' +
                "Hello.displayName = 'Hello';\n" +
                'const styles = StyleSheet.create({ name: {} });\n',
        },
        { name: 'Only the style sheet', code: 'const styles = StyleSheet.create({ name: {} });\n' },
        {
            name: 'Style object variable',
            code:
                'const styles = StyleSheet.create({ name: {}, welcome: {} });\n' +
                'const Hello = ({ condition = true }) => {\n' +
                '    const myStyle = condition ? styles.name : styles.welcome;\n' +
                '    return <Text style={myStyle}>Hello</Text>;\n' +
                '};\n',
        },
        {
            name: 'Spread syntax',
            code:
                'const additionalStyles = {};\n' +
                'const styles = StyleSheet.create({ name: {}, ...additionalStyles });\n' +
                'const Hello = () => <Text style={styles.name}>Hello</Text>;\n',
        },
        {
            name: 'Custom style sheet',
            code:
                'const styles = EStyleSheet.create({ name: {} });\n' +
                'const Hello = () => <Text style={styles.name}>Hello</Text>;\n',
        },
    ],
    invalid: [
        {
            name: 'Function component',
            code:
                'function Hello() {\n' +
                '    return <Text style={styles.name}>Hello</Text>;\n' +
                '}\n' +
                'const styles = StyleSheet.create({ name: {}, welcome: {} });\n',
            errors: [{ message: 'Unused style detected: styles.welcome' }],
        },
        {
            name: 'Anonymous function component',
            code:
                'const Hello = function () {\n' +
                '    return <Text style={styles.name}>Hello</Text>;\n' +
                '};\n' +
                'const styles = StyleSheet.create({ name: {}, welcome: {} });\n',
            errors: [{ message: 'Unused style detected: styles.welcome' }],
        },
        {
            name: 'Arrow function component',
            code:
                'const Hello = () => <Text style={styles.name}>Hello</Text>;\n' +
                'const styles = StyleSheet.create({ name: {}, welcome: {} });\n',
            errors: [{ message: 'Unused style detected: styles.welcome' }],
        },
        {
            name: 'Component declared after the styles',
            code:
                'const styles = StyleSheet.create({ name: {}, welcome: {} });\n' +
                'const Hello = () => <Text style={styles.name}>Hello</Text>;  \n',
            errors: [{ message: 'Unused style detected: styles.welcome' }],
        },
        {
            name: 'Multiple style objects',
            code:
                'const styles = StyleSheet.create({ name: {},  welcome: {}, button: {} });\n' +
                'const Hello = () => <Text style={styles.name}>Hello</Text>;\n' +
                'const Welcome = () => <Text style={styles.welcome}>Welcome</Text>;  \n',
            errors: [{ message: 'Unused style detected: styles.button' }],
        },
        {
            name: 'Style object passed as a variable',
            code:
                'const styles = StyleSheet.create({ name: {}, welcome: {} });\n' +
                'const Hello = ({ textStyle }) => <Text style={[styles.name, textStyle]}>Hello</Text>;  \n',
            errors: [{ message: 'Unused style detected: styles.welcome' }],
        },
        {
            name: 'Style objects from different style sheets',
            code:
                'const styles = StyleSheet.create({ name: {}, welcome: {} });\n' +
                'const styles2 = StyleSheet.create({ name: {} });\n' +
                'const Hello = () => <Text style={[styles.name, styles2.name]}>Hello</Text>;  \n',
            errors: [{ message: 'Unused style detected: styles.welcome' }],
        },
        {
            name: 'Conditional style objects (positive)',
            code:
                'const styles = StyleSheet.create({ name: {}, welcome: {} });\n' +
                'const Hello = ({condition = true}) => <Text style={condition && styles.name}>Hello</Text>;  \n',
            errors: [{ message: 'Unused style detected: styles.welcome' }],
        },
        {
            name: 'Conditional style objects (negative)',
            code:
                'const styles = StyleSheet.create({ name: {}, welcome: {} });\n' +
                'const Hello = ({condition = false}) => <Text style={condition && styles.name}>Hello</Text>;  \n',
            errors: [{ message: 'Unused style detected: styles.welcome' }],
        },
        {
            name: 'Conditional style objects inside an array (positive)',
            code:
                'const styles = StyleSheet.create({ name: {}, welcome: {} });\n' +
                'const Hello = ({condition = true}) => <Text style={[condition && styles.name]}>Hello</Text>;  \n',
            errors: [{ message: 'Unused style detected: styles.welcome' }],
        },
        {
            name: 'Conditional style objects inside an array (negative)',
            code:
                'const styles = StyleSheet.create({ name: {}, welcome: {} });\n' +
                'const Hello = ({condition = false}) => <Text style={[condition && styles.name]}>Hello</Text>;  \n',
            errors: [{ message: 'Unused style detected: styles.welcome' }],
        },
        {
            name: 'Ternary operator',
            code:
                'const styles = StyleSheet.create({ name: {}, welcome: {}, button: {} });\n' +
                'const Hello = ({ condition = true }) => <Text style={condition ? styles.name : styles.welcome}>Hello</Text>;  \n',
            errors: [{ message: 'Unused style detected: styles.button' }],
        },
        {
            name: 'Ternary operator inside an array',
            code:
                'const styles = StyleSheet.create({ name: {}, welcome: {}, button: {} });\n' +
                'const Hello = ({ condition = true }) => <Text style={[condition ? styles.name : styles.welcome]}>Hello</Text>;  \n',
            errors: [{ message: 'Unused style detected: styles.button' }],
        },
        {
            name: 'createClass syntax',
            code:
                'const styles = StyleSheet.create({ name: {}, welcome: {} });\n' +
                'const Hello = React.createClass({ render: () => <Text style={styles.name}>Hello</Text> }); \n',
            errors: [{ message: 'Unused style detected: styles.welcome' }],
        },
        {
            name: 'Class component syntax',
            code:
                'const styles = StyleSheet.create({ name: {}, welcome: {} });\n' +
                'class Hello extends Component {\n' +
                '    render() {\n' +
                '        return <Text style={styles.name}>Hello</Text>;\n' +
                '    }\n' +
                '}  \n',
            errors: [{ message: 'Unused style detected: styles.welcome' }],
        },
        {
            name: 'Pure component syntax',
            code:
                'const styles = StyleSheet.create({ name: {}, welcome: {} });\n' +
                'class Hello extends PureComponent {\n' +
                '    render() {\n' +
                '        return <Text style={styles.name}>Hello</Text>;\n' +
                '    }\n' +
                '}  \n',
            errors: [{ message: 'Unused style detected: styles.welcome' }],
        },
        {
            name: 'Memoized function component',
            code:
                'const Hello = memo(() => <Text style={styles.name}>Hello</Text>);\n' +
                "Hello.displayName = 'Hello';\n" +
                'const styles = StyleSheet.create({ name: {}, welcome: {} });  \n',
            errors: [{ message: 'Unused style detected: styles.welcome' }],
        },
        {
            name: 'Style object variable',
            code:
                'const styles = StyleSheet.create({ name: {}, welcome: {}, button: {} });\n' +
                'const Hello = ({ condition = true }) => {\n' +
                '    const myStyle = condition ? styles.name : styles.welcome;\n' +
                '    return <Text style={myStyle}>Hello</Text>;\n' +
                '};  \n',
            errors: [{ message: 'Unused style detected: styles.button' }],
        },
        {
            name: 'Spread syntax',
            code:
                'const additionalStyles = {};\n' +
                'const styles = StyleSheet.create({ name: {}, welcome: {}, ...additionalStyles });\n' +
                'const Hello = () => <Text style={styles.name}>Hello</Text>;  \n',
            errors: [{ message: 'Unused style detected: styles.welcome' }],
        },
        {
            name: 'Custom style sheet',
            code:
                'const styles = EStyleSheet.create({ name: {}, welcome: {} });\n' +
                'const Hello = () => <Text style={styles.name}>Hello</Text>;  \n',
            errors: [{ message: 'Unused style detected: styles.welcome' }],
        },
    ],
});
