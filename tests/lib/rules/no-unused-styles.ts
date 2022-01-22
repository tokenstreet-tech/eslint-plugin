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
                'const Hello = () => <Text style={styles.name}>Hello</Text>;\n' +
                'const styles = StyleSheet.create({ name: {} });\n',
        },
        {
            name: 'Function component, declared after the styles',
            code:
                'const styles = StyleSheet.create({ name: {} });\n' +
                'const Hello = () => <Text style={styles.name}>Hello</Text>;\n',
        },
        {
            code:
                'const styles = StyleSheet.create({ name: {},  welcome: {} });\n' +
                'const Hello = () => <Text style={styles.name}>Hello</Text>;\n' +
                'const Welcome = () => <Text style={styles.welcome}>Welcome</Text>;\n',
        },
        {
            code:
                'const styles = StyleSheet.create({ name: {} });\n' +
                'const Hello = ({ textStyle }) => <Text style={[styles.name, textStyle]}>Hello</Text>;\n',
        },
        {
            code:
                'const styles = StyleSheet.create({ name: {} });\n' +
                'const styles2 = StyleSheet.create({ name: {} });\n' +
                'const Hello = () => <Text style={[styles.name, styles2.name]}>Hello</Text>;\n',
        },
        {
            code:
                'const styles = StyleSheet.create({ name: {} });\n' +
                'const Hello = ({condition = true}) => <Text style={condition && styles.name}>Hello</Text>;\n',
        },
        {
            code:
                'const styles = StyleSheet.create({ name: {} });\n' +
                'const Hello = ({condition = false}) => <Text style={condition && styles.name}>Hello</Text>;\n',
        },
        {
            code:
                'const styles = StyleSheet.create({ name: {} });\n' +
                'const Hello = ({condition = true}) => <Text style={[condition && styles.name]}>Hello</Text>;\n',
        },
        {
            code:
                'const styles = StyleSheet.create({ name: {} });\n' +
                'const Hello = ({condition = false}) => <Text style={[condition && styles.name]}>Hello</Text>;\n',
        },
        {
            code:
                'const styles = StyleSheet.create({ name: {}, welcome: {} });\n' +
                'const Hello = ({ condition = true }) => <Text style={condition ? styles.name : styles.welcome}>Hello</Text>;\n',
        },
        {
            code:
                'const styles = StyleSheet.create({ name: {}, welcome: {} });\n' +
                'const Hello = ({ condition = true }) => <Text style={[condition ? styles.name : styles.welcome]}>Hello</Text>;\n',
        },
        {
            code:
                'const styles = StyleSheet.create({ name: {} });\n' +
                'const Hello = React.createClass({ render: () => <Text style={styles.name}>Hello</Text> });\n',
        },
        {
            code:
                'const styles = StyleSheet.create({ name: {} });\n' +
                'class Hello extends Component {\n' +
                '    render() {\n' +
                '        return <Text style={styles.name}>Hello</Text>;\n' +
                '    }\n' +
                '}\n',
        },
        { code: 'const styles = StyleSheet.create({ name: {} });\n' },
        {
            code:
                'const styles = StyleSheet.create({ name: {}, welcome: {} });\n' +
                'const Hello = ({ condition = true }) => {\n' +
                '    const myStyle = condition ? styles.name : styles.welcome;\n' +
                '    return <Text style={myStyle}>Hello</Text>;\n' +
                '};\n',
        },
        {
            code:
                'const additionalStyles = {};\n' +
                'const styles = StyleSheet.create({ name: {}, ...additionalStyles });\n' +
                'const Hello = () => <Text style={styles.name}>Hello</Text>;\n',
        },
        {
            code:
                'const styles = EStyleSheet.create({ name: {} });\n' +
                'const Hello = () => <Text style={styles.name}>Hello</Text>;\n',
        },
    ],

    invalid: [
        {
            code: `
      const styles = StyleSheet.create({
        text: {}
      })
      const Hello = React.createClass({
        render: function() {
          return <Text style={styles.b}>Hello {this.props.name}</Text>;
        }
      });
    `,
            errors: [
                {
                    message: 'Unused style detected: styles.text',
                },
            ],
        },
        {
            code: `
      const styles = StyleSheet.create({
        foo: {},
        bar: {},
      })
      class Foo extends React.Component {
        render() {
          return <View style={styles.foo}/>;
        }
      }
    `,
            errors: [
                {
                    message: 'Unused style detected: styles.bar',
                },
            ],
        },
        {
            code: `
      const styles = StyleSheet.create({
        foo: {},
        bar: {},
      })
      class Foo extends React.PureComponent {
        render() {
          return <View style={styles.foo}/>;
        }
      }
    `,
            errors: [
                {
                    message: 'Unused style detected: styles.bar',
                },
            ],
        },
        {
            code: `
      const styles = OtherStyleSheet.create({
        foo: {},
        bar: {},
      })
      class Foo extends React.PureComponent {
        render() {
          return <View style={styles.foo}/>;
        }
      }
    `,
            errors: [
                {
                    message: 'Unused style detected: styles.bar',
                },
            ],
        },
        {
            code: `
      const styles = StyleSheet.create({
        text: {}
      })
      const Hello = () => (<><Text style={styles.b}>Hello</Text></>);
    `,
            errors: [
                {
                    message: 'Unused style detected: styles.text',
                },
            ],
        },
    ],
});
