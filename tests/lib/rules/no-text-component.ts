/**
 * @fileoverview
 * We use our Typography component to display text,
 * which for example preconfigures the font family and other properties.
 * Therefore, this component should always be used instead of the text component.
 *
 * @author Daniel Reichhart <daniel@tokenstreet.com>
 */

/*
 * ------------------------------------------------------------------------------
 *  Requirements
 * ------------------------------------------------------------------------------
 */
import * as eslint from 'eslint';

import { noTextComponent } from '../../../lib/rules/no-text-component';

/*
 * ------------------------------------------------------------------------------
 *  Tests
 * ------------------------------------------------------------------------------
 */

const ruleTester = new eslint.RuleTester({ parserOptions: { ecmaFeatures: { jsx: true }, ecmaVersion: 6 } });
ruleTester.run('no-text-components', noTextComponent, {
    invalid: [
        {
            code: 'const MyComponent = () => <Text>Some text</Text>',
            errors: [
                {
                    message:
                        'The react-native <Text /> component is not allowed. Please use the custom <Typography /> component.',
                    type: 'JSXElement',
                },
            ],
        },
        {
            code: 'const MyComponent = () => <Animated.Text>Some text</Animated.Text>',
            errors: [
                {
                    message:
                        'The react-native <Animated.Text /> component is not allowed. Please use the custom <Typography.Animated /> component.',
                    type: 'JSXElement',
                },
            ],
        },
    ],
    valid: [
        'const MyComponent = () => <Typography>Some text</Typography>',
        'const MyComponent = () => <Typography.Animated>Some text</Typography.Animated>',
    ],
});
