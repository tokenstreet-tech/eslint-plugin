# No Error (no-error)

We use our `ErrorHandler` to handle warnings, errors and fatal errors,
which reacts appropriately and unified to the severity.
Therefore, this handler should always be used instead of throwing an error yourself.

## Rule Details

Examples of **incorrect** code for this rule:

```ts
new Error('foo');
new EvalError('foo');
new InternalError('foo');
new RangeError('foo');
new ReferenceError('foo');
new SyntaxError('foo');
new TypeError('foo');
new URIError('foo');
throw new Error('foo');
throw new EvalError('foo');
throw new InternalError('foo');
throw new RangeError('foo');
throw new ReferenceError('foo');
throw new SyntaxError('foo');
throw new TypeError('foo');
throw new URIError('foo');
```

Examples of **correct** code for this rule:

```ts
new FooClass();
const Error = 'foo';
ErrorHandler.error({ code: FrontendErrorCodeEnum.BAD_HEX_COLOR, filename: 'ColorUtil.ts' });
```

## When Not To Use It

For parts of the start-up process, for example our config.
The `ErrorHandler` uses the config, and the config uses the `ErrorHandler`.
This would create a recursive cycle.
