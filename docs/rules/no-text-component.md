# No Text component (no-text-component)

We use our Typography component to display text, which for example preconfigures the font family and other properties.
Therefore, this component should always be used instead of the text component.

## Rule Details

Examples of **incorrect** code for this rule:

```ts
const MyComponent = () => <Text>Some text</Text>;
```

Examples of **correct** code for this rule:

```ts
const MyComponent = () => <Typography>Some text</Typography>;
```

## When Not To Use It

Give a short description of when it would be appropriate to turn off this rule.
