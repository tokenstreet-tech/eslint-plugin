---
name: Bug report
about: Create a report to help us improve
title: ''
labels: bug
assignees: reichhartd

---

**Describe the bug**
A clear and concise description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected behavior**
A clear and concise description of what you expected to happen.

**Screenshots**
If applicable, add screenshots to help explain your problem.

**Environment (please complete the following information):**
 - Node.js version: [e.g. 16.14.2 LTS]
 - `eslint` version: [e.g. v8.13.0]
 - `@tokenstreet/eslint-plugin` version [e.g. v0.3.1]

**`eslintrc` file (please copy yours):**
e.g.
```
root: true
parser: '@typescript-eslint/parser'
parserOptions:
    project:
        - './tsconfig.json'
plugins:
    - '@typescript-eslint'
    - simple-import-sort
extends:
    - eslint:all
    - plugin:@typescript-eslint/all
    - plugin:eslint-plugin/all
    - prettier
env:
    node: true
    es6: true
overrides:
    - files:
          - tests/**/*.ts
      env:
          mocha: true
```
**Additional context**
Add any other context about the problem here.
