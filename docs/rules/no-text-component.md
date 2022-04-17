# No Text component (no-text-component)

We use our Typography component to display text,
which for example preconfigures the font family and other properties.
Therefore, this component should always be used instead of the text component.

The ESLint rule `no-restricted-imports:` would make this rule only partially redundant,
as it would only prohibit the `Text` component, but not `Animated.Text`.
This is in the nature of this rule, as only the entire React Native `Animated` module can be imported.

````yml
no-restricted-imports:
  - 2
  - name: react-native
    importNames:
      - Text
    message: The react-native <Text /> component is not allowed. Please use the custom <Typography /> component.
```

## Rule Details

Examples of **incorrect** code for this rule:

```ts
const MyComponent = () => <Text>Some text</Text>;
const MyComponent = () => <Animated.Text>Some text</Animated.Text>;
````

Examples of **correct** code for this rule:

```ts
const MyComponent = () => <Typography>Some text</Typography>;
const MyComponent = () => <Typography.Animated>Some text</Typography.Animated>;
```
