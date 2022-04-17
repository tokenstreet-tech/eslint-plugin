# No Throw (no-throw)

We use the ErrorHandler to handle warnings, errors and fatal errors,
which reacts appropriately and unified to the severity.
Therefore, this should always be used instead of throwing an error yourself.

## Rule Details

Examples of **incorrect** code for this rule:

```ts
throw new Error('foo');
throw error;
```

Examples of **correct** code for this rule:

```ts

```

## When Not To Use It

Give a short description of when it would be appropriate to turn off this rule.
