# Vue/TypeScript Testing

The Vue/TypeScript part of the application under the `frontend` directory has two types of tests. The unit tests, which test functions and components, use `vitest` and `vue-test-utils`. You can run them with:

```sh
pnpm run --filter rotki test:unit
```

These are small tests ensuring that parts of the code work well in isolation.

The second type of tests is an end-to-end (`e2e`) test suite using `cypress`. The e2e tests require the Python virtual environment because they depend on the actual Python backend. These tests ensure proper e2e functionality and application integration and try to replicate scenarios of real user interaction through the application.

To run the e2e tests, use the following command inside the frontend directory:

```sh
pnpm run --filter rotki test:integration-ci
```

The above command will run the e2e tests in headless mode. If you want to debug specific tests, you can also run:

```sh
pnpm run --filter rotki test:integration
```

This command will open the Cypress Test Runner window where you can select specific suites to execute.

## Linting

If you are doing frontend development, it is highly recommended to enable the available hooks:

```sh
pnpm run setup:hooks
```

You will see a message saying `husky - Git hooks installed`. Now you should have a pre-commit hook that runs whenever you commit a file and lints the staged files.

Before committing and pushing your commits, ensure that you fix any lint issues. You can do this by running:

```sh
pnpm run lint:fix
```

> **Note:** While lint warnings are not fatal and will not fail the CI pipeline, it would be better if a PR reduces the number of warnings and doesn't introduce new ones. Warnings are things that need to be fixed, and they will be converted to errors in the future.

## Vue

### Setup Script Macros

When using the `defineProps` or `defineEmits` macros in the setup script, the `defineX<{}>()` format should be used instead of `defineX({})`.

Any instances of `defineX({})` should eventually be replaced with `defineX<{}>()`.

### Style Tag

Initially, the style tag was using scoped SCSS with [BEM](https://getbem.com/naming/) for naming. Any scoped style should eventually be replaced with [CSS Modules](https://vuejs.org/api/sfc-css-features.html#css-modules), and we should simplify naming and move away from BEM.

## Dependencies

### Adding New Dependencies

As a rule of thumb, we should pick dependencies that come from well-known trusted sources, e.g., known Vue ecosystem/Nuxt maintainers with a good track record. From experience, these dependencies tend to have better support and more regular updates.

If the functionality implemented is simple enough and doesn't add a big maintenance overhead to the team, it would be preferable to skip the extra dependency and implement it as part of our codebase.

### Versions

We always pin strict versions of our first-party dependencies, e.g.:

```json
{
  "dependencies": {
    "package": "1.0.0"
  }
}
```

instead of:

```json
{
  "dependencies": {
    "package": "^1.0.0"
  }
}
```
