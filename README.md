# @tokenstreet/eslint-plugin

description

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `@tokenstreet/eslint-plugin`:

```sh
npm install @tokenstreet/eslint-plugin --save-dev
```

## Usage

Add `@tokenstreet` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": ["@tokenstreet"]
}
```

Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "@tokenstreet/no-text-component": 2
    }
}
```

## Supported Rules

-   [`no-error`](docs/rules/no-error.md)
-   [`no-logger-error-method`](docs/rules/no-logger-error-method.md)
-   [`no-text-component`](docs/rules/no-text-component.md)
-   [`no-throw`](docs/rules/no-throw.md)
