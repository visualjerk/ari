# Ari

Accessible unstyled Vue components inspired by Reakit.

[![CI](https://github.com/visualjerk/ari/workflows/CI/badge.svg)](https://github.com/visualjerk/ari/actions)
[![Test Coverage](https://codecov.io/gh/visualjerk/ari/branch/master/graph/badge.svg)](https://codecov.io/gh/visualjerk/ari)

## Installation

```bash
npm i vue-ari
```

or

```bash
yarn add vue-ari
```

## Usage

```vue
<template>
  <Clickable v-bind="$props" as="button">
    <slot />
  </Clickable>
</template>

<script>
import { Clickable, clickableProps } from 'vue-ari'

export default {
  name: 'AppButton',
  components: {
    Clickable,
  },
  props: clickableProps,
}
</script>
```

## Styling

Ari components are unstyled by default. That means you got some work to do.

It also means you are not bound to some opinionated styling.

You have complete freedom in creating your own visual appearance from ari base components.

```vue
<template>
  <Clickable v-bind="$props" as="button" class="my-button">
    <slot />
  </Clickable>
</template>

<script>
import { Clickable, clickableProps } from 'vue-ari'

export default {
  name: 'MyButton',
  components: {
    Clickable,
  },
  props: clickableProps,
}
</script>

<style scoped>
.my-button {
  padding: 0.5em 1em;
  color: white;
  background-color: blue;
  border-radius: 0.5em;
}

.my-button[disabled] {
  opacity: 0.5;
}
</style>
```
