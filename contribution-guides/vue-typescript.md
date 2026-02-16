# Vue/TypeScript

## Testing

The Vue/TypeScript part of the application under the `frontend` directory has two types of tests.

### Unit Tests

The unit tests, which test functions and components, use `vitest` and `vue-test-utils`. You can run them with:

```sh
pnpm run --filter rotki test:unit
```

These are small tests ensuring that parts of the code work well in isolation.

**Unit test file naming**: `.spec.ts` files should follow the naming of the tested file and be located in the same folder.

```
src/modules/balances/use-balances-store.ts
src/modules/balances/use-balances-store.spec.ts

src/composables/accounts/use-account-import-export.ts
src/composables/accounts/use-account-import-export.spec.ts
```

### End-to-End Tests

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

## Code Organization & Maintainability

- **Split complex logic**: Break down large templates and script logic into smaller, focused composables.
- **Component decomposition**: Split large components into smaller, reusable sub-components.
- **Logical separation**: Each composable should have a single, well-defined responsibility.
- **Maintainability focus**: Prioritize code readability and maintainability over brevity.

## Vue

### Explicit TypeScript Typing

Always use explicit types for `ref<T>()`, `computed<T>()`, and function return types. Use `get()` and `set()` from VueUse instead of `.value` when working with refs.

If a ref type can be undefined and the default value is undefined, don't explicitly put it as type or default value — just use `ref<T>()`.

Always use `{ useScope: 'global' }` parameter for `useI18n()`.

Use `startPromise()` instead of `void` for floating promises.

**Correct:**

```typescript
import { startPromise } from '@shared/utils';
import { get, set } from '@vueuse/shared';

const isVisible = ref<boolean>(true);
const count = ref<number>(0);
const items = ref<string[]>([]);
const user = ref<User>(); // type is User | undefined, no need to specify undefined

const { t } = useI18n({ useScope: 'global' });

const isEven = computed<boolean>(() => get(count) % 2 === 0);
const formattedName = computed<string>(() => `${get(firstName)} ${get(lastName)}`);

function getUserById(id: number): User | undefined {
  return get(users).find(user => user.id === id) || undefined;
}

function updateCount(newValue: number): void {
  set(count, newValue);
}

async function fetchData(): Promise<ApiResponse> {
  return await $fetch('/api/data');
}

startPromise(someAsyncFunction());
```

**Incorrect:**

```typescript
// ❌ Missing explicit types
const isVisible = ref(true);
const count = ref(0);
const items = ref([]);
const user = ref();

// ❌ Missing useScope
const { t } = useI18n();

// ❌ Using .value instead of get()/set()
const isEven = computed(() => count.value % 2 === 0);
const formattedName = computed(() => `${firstName.value} ${lastName.value}`);

// ❌ Don't explicitly put undefined as type or default value
const newId = ref<number | undefined>(undefined);

// ❌ Missing return types
function getUserById(id: number) {
  return users.value.find(user => user.id === id) || undefined;
}

async function fetchData() {
  return await $fetch('/api/data');
}

// ❌ Never use void for floating promises
// eslint-disable-next-line no-void
void someAsyncFunction();
```

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

#### Props — Destructured with Defaults (Vue 3.5+)

Prefer destructuring props with defaults directly from `defineProps`:

```typescript
const { title, count = 0, disabled = false } = defineProps<{
  title: string;
  count?: number;
  disabled?: boolean;
}>();
```

For mutable defaults (arrays, objects), use factory functions:

```typescript
const { items = () => [], filters = () => ({}) } = defineProps<{
  items?: string[];
  filters?: Record<string, string>;
}>();
```

The legacy `withDefaults` pattern should be avoided in new code:

```typescript
// ❌ Legacy pattern
const props = withDefaults(defineProps<{
  title: string;
  count?: number;
  disabled?: boolean;
}>(), {
  count: 0,
  disabled: false,
});
```

#### defineModel (Vue 3.4+)

Use `defineModel` for v-model bindings instead of manual prop + emit patterns:

```typescript
const modelValue = defineModel<string>({ required: true });
const selected = defineModel<number>('selected');
const filters = defineModel<Filters>('filters', { default: () => ({}) });
```

**Incorrect** — do not use manual prop + emit for v-model:

```typescript
// ❌ Do NOT do this
const props = defineProps<{ modelValue: string }>();
const emit = defineEmits<{ 'update:modelValue': [value: string] }>();
```

#### Template Refs (Vue 3.5+)

Use `useTemplateRef` for template refs:

```typescript
import { useTemplateRef } from 'vue';

const formRef = useTemplateRef<InstanceType<typeof MyForm>>('formRef');
```

```vue-html
<MyForm ref="formRef" />
```

**Incorrect** — do not use the old `ref()` pattern for template refs:

```typescript
// ❌ Old pattern
const formRef = ref<InstanceType<typeof MyForm>>();
```

### Setup script order

The preferred order of a setup script in should be the following:

```typescript
import { defineExpose } from '@vue/runtime-core';
// 1. Imports
import { get, set } from '@vueuse/core';

// 2. Definitions (defineX)
defineOptions({
  inheritAttrs: false,
});

const { msg } = defineProps<{
  msg: string;
}>();

const emit = defineEmits<{
  'update:msg': [msg: string];
}>();

// 3. I18n & vue-router
const { t } = useI18n({ useScope: 'global' });
const router = useRouter();
const route = useRoute();

// 4. Reactive State variables
const counter = ref<number>(0);

// 5. Use Pinia stores
const { todos } = toRefs(useTodoStore());

// 6. Composables
const { title } = useTitle();

// 7. Computed
const titleNumber = computed<string>(() => `${get(title)} ${get(counter)}`);

// 8. Define Methods
function increaseCounter(): void {
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

CSS modules (`<style module>`) should only be used for Vue `TransitionGroup` animations.

If you encounter components using legacy scoped styles or CSS modules, consider migrating them to Tailwind classes when making changes to those components.

### Localization

- Keys in localization files (`en.json`, `es.json`, etc.) should be ordered alphabetically.
- Avoid dynamic keys for translations, as they can break the linter.

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
