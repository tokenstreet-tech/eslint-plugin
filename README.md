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

-   Fill in provided rules here
