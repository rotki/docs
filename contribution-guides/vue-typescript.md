# Vue/TypeScript

## Testing

The Vue/TypeScript part of the application under the `frontend` directory has two types of tests. The unit tests, which test functions and components, use `vitest` and `vue-test-utils`. You can run them with:

```sh
pnpm run --filter rotki test:unit
```

These are small tests ensuring that parts of the code work well in isolation.

The second type of tests is an end-to-end (`e2e`) test suite using [Playwright](https://playwright.dev/). The e2e tests require the Python environment with all dependencies installed because they depend on the actual Python backend. These tests ensure proper e2e functionality and application integration and try to replicate scenarios of real user interaction through the application.

To run the e2e tests, use the following command inside the frontend directory:

```sh
pnpm run --filter rotki test:e2e
```

The above command will run the e2e tests in headless mode. If you want to debug specific tests, you can also run:

```sh
pnpm run --filter rotki test:e2e:ui
```

This command will open the Playwright UI mode where you can select specific tests to execute and see detailed traces.

## Linting

If you are doing frontend development, it is highly recommended to enable the available hooks:

```sh
pnpm run setup:hooks
```

Now you should have a pre-commit hook that runs whenever you commit a file and lints the staged files.

> [!NOTE]
> If the hook was installed successfully, you should see lint-staged running every time you commit.

Before committing and pushing your commits, ensure that you fix any lint issues. You can do this by running:

```sh
pnpm run lint:fix
```

> **Note:** While lint warnings are not fatal and will not fail the CI pipeline, it would be better if a PR reduces the number of warnings and doesn't introduce new ones. Warnings are things that need to be fixed, and they will be converted to errors in the future.

## Vue

### Setup Script Macros

When using the `defineProps` or `defineEmits` macros in the setup script, the `defineX<{}>()` format should be used instead of `defineX({})`.

Any instances of `defineX({})` should eventually be replaced with `defineX<{}>()`.

For `defineEmits<{...}>()` before the migration to vue 3 the verbose style was used. When you encounter such entries,
try to replace with the short style instead.

e.g.

**Before**

```typescript
const emit = defineEmits<{
  (e: 'update:msg', msg: string): void;
}>();
```

**After**

```typescript
const emit = defineEmits<{
  'update:msg': [msg: string];
}>();
```

### Setup script order

The preferred order of a setup script in should be the following:

```typescript
import { defineExpose } from '@vue/runtime-core';
// 1. Imports
import { get } from '@vueuse/core';

// 2. Definitions (defineX)
defineOptions({
  inheritAttrs: false,
});

const props = defineProps<{
  msg: string;
}>();

const emit = defineEmits<{
  'update:msg': [msg: string];
}>();

const { msg } = toRefs(props);

// 3. I18n & vue-router
const { t } = useI18n();
const router = useRouter();
const route = useRoute();

// 4. Reactive State variables
const counter = ref(0);

// 5. Use Pinia stors
const { todos } = toRefs(useTodoStore());

// 6. Composables
const { title } = useTitle();

// 7. Computed
const titleNumber = computed(() => `${get(title)} ${get(counter)}`);

// 8. Define Methods
function increaseCounter() {
  set(counter, get(counter) + 1);
}

// 9. Watchers
watch(title, (title) => {
  emit('update:msg', title);
});

// 10. Lifecycle
onMounted(() => {
  increaseCounter();
});

// 11. Exposed
defineExpose({
  increaseCounter,
});
```

### Pinia Store

For pinia stores the suggested order for elements is the following.

```typescript
// stores/counter.ts
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useCounterStore = defineStore('counter', () => {
  // 1. State
  const count = ref<number>(0);

  // 2. Getters
  const doubleCount = computed(() => count.value * 2);

  // 3. Actions
  function increment(): void {
    count.value++;
  }

  function decrement(): void {
    count.value--;
  }

  // 4. Watchers
  watch(count, (count) => {
    // do something
  });

  return {
    count,
    doubleCount,
    increment,
    decrement,
  };
});
```

### useAttrs

It should be only used if there is some access to the `attrs` inside the script tag.
If the only usage is in the template part then use `$attrs` instead.

### Styling

Use [Tailwind CSS](https://tailwindcss.com/) utility classes directly in the template for styling components. Avoid using scoped styles, CSS modules, or BEM naming conventions.

```vue
<template>
  <div class="flex items-center gap-2 p-4 rounded-lg bg-rui-grey-100">
    <span class="text-rui-text font-medium">{{ title }}</span>
  </div>
</template>
```

If you encounter components using legacy scoped styles or CSS modules, consider migrating them to Tailwind classes when making changes to those components.

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

## Working with UI Library

### Testing Component Changes

To test unpublished UI library changes in the main application:

1. **Build the Library**

   ```sh
   pnpm run build:prod
   ```

2. **Link to Application**
   - Open `package.json` in rotki main directory `frontend/app/package.json`
   - Change UI library version to point to local build:
     ```json
     {
       "dependencies": {
         "@rotki/ui-library": "file:../../../ui-library" // adjust path based on your UI library location
       }
     }
     ```
3. **Update Application**

   ```sh
   pnpm install
   ```

4. **Refresh Changes**
   - Rebuild library after changes
   - Run `pnpm install` in frontend directory
   - Restart development server

### Troubleshooting

If experiencing display issues:

1. Clean modules:

   ```sh
   pnpm run clean:modules
   ```

2. Reinstall dependencies:

   ```sh
   pnpm install
   ```

3. Restart development server
   ```sh
   pnpm run dev
   ```

### Branch Compatibility

- UI Library: `main` branch
- Rotki App: `develop` branch

These branches should be compatible. If encountering issues, try cleaning and reinstalling modules to resolve caching problems.
