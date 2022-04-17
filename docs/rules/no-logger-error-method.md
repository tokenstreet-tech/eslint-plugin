# No Logger Error Method (no-logger-error-method)

The logger methods "warn", "error" and "fatal" should not be used directly.
Instead, one should call the ErrorHandler, which reacts appropriately to the status and calls the logger.

## Rule Details

Examples of **incorrect** code for this rule:

```ts
Logger.warn('Logger.ts', 'message');
Logger.error('Logger.ts', 'message');
Logger.fatal('Logger.ts', 'message');
```

Examples of **correct** code for this rule:

```ts
Logger.debug('Logger.ts', 'message');
Logger.info('Logger.ts', 'message');
```

## When Not To Use It

Give a short description of when it would be appropriate to turn off this rule.
