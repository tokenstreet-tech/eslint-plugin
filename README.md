# @tokenstreet/eslint-plugin

This plugin is used for tokenstreet React Native projects.

[![npm version](https://badgen.net/npm/v/@tokenstreet/eslint-plugin)](https://www.npmjs.com/package/@tokenstreet/eslint-plugin)
[![downloads](https://badgen.net/npm/dm/@tokenstreet/eslint-plugin)](https://www.npmjs.com/package/@tokenstreet/eslint-plugin)
[![types](https://badgen.net/npm/types/@tokenstreet/eslint-plugin)](https://www.npmjs.com/package/@tokenstreet/eslint-plugin)
[![minzipped size](https://badgen.net/bundlephobia/minzip/@tokenstreet/eslint-plugin)](https://bundlephobia.com/result?p=@tokenstreet/eslint-plugin@latest)
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/tokenstreet-tech/eslint-plugin/issues?q=is%3Aissue+is%3Aopen+label%3A%22help+wanted%22)

Most of the rules will not make sense for other projects.
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
