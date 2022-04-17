# @tokenstreet/eslint-plugin

This plugin is used for tokenstreet React Native projects. Most of the rules will not make sense for other projects.
However, this repository and the associated npm package is public to make tooling easier for us.

## Installation

You'll need to install [ESLint](https://eslint.org/) and the plugin:

```sh
yarn add -D eslint @tokenstreet/eslint-plugin
```

or

```sh
npm install eslint @tokenstreet/eslint-plugin --save-dev
```

## Usage

Add `@tokenstreet` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": ["@tokenstreet"]
}
```

To activate all rules, use the following configuration:

```json
{
    "extends": ["@tokenstreet/all"]
}
```

Alternatively, individual rules can be activated or deactivated:

```json
{
    "rules": {
        "@tokenstreet/no-error": 2,
        "@tokenstreet/no-logger-error-method": 2,
        "@tokenstreet/no-text-component": 2,
        "@tokenstreet/no-throw": 2
    }
}
```

## Supported Rules

-   [`no-error`](docs/rules/no-error.md)
-   [`no-logger-error-method`](docs/rules/no-logger-error-method.md)
-   [`no-text-component`](docs/rules/no-text-component.md)
-   [`no-throw`](docs/rules/no-throw.md)
