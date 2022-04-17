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
ErrorHandler.error({ code: FrontendErrorCodeEnum.BAD_HEX_COLOR, filename: 'ColorUtil.ts' });
```

## When Not To Use It

For parts of the start-up process, for example our config.
The `ErrorHandler` uses the config, and the config uses the `ErrorHandler`.
This would create a recursive cycle.
