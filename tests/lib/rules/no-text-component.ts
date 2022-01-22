/**
 * @fileoverview We use our Typography component to display text, which for example preconfigures the font family and other properties. Therefore, this component should always be used instead of the text component.
 * @author Daniel Reichhart <daniel@tokenstreet.com>
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------
import { noTextComponent } from '../../../lib/rules/no-text-component';
import { RuleTester } from 'eslint';

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
    parserOptions: {
        ecmaVersion: 6,
        ecmaFeatures: {
            jsx: true,
        },
    },
});
ruleTester.run('no-text-components', noTextComponent, {
    valid: [
        { code: 'const MyComponent = () => (<Typography>Some text</Typography>)' },
        { code: 'const MyComponent = () => (<Typography.Animated>Some text</Typography.Animated>)' },
    ],
    invalid: [
        {
            code: 'const MyComponent = () => (<Text>Some text</Text>)',
            errors: [
                {
                    message:
                        'The react-native <Text /> component is not allowed. Please use the custom <Typography /> component.',
                    type: 'JSXElement',
                },
            ],
        },
        {
            code: 'const MyComponent = () => (<Animated.Text>Some text</Animated.Text>)',
            errors: [
                {
                    message:
                        'The react-native <Animated.Text /> component is not allowed. Please use the custom <Typography.Animated /> component.',
                    type: 'JSXElement',
                },
            ],
        },
    ],
});
