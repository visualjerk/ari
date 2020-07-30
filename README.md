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
  <Button v-bind="$props">
    <slot />
  </Button>
</template>

<script>
import { Button, buttonProps } from 'vue-ari'

export default {
  name: 'AppButton',
  components: {
    Button,
  },
  props: buttonProps,
}
</script>
```

## Styling

Ari components are unstyled by default. That means you got some work to do.

It also means you are not bound to some opinionated styling.

You have complete freedom in creating your own visual appearance from ari base components.

```vue
<template>
  <Button v-bind="$props" class="app-button">
    <slot />
  </Button>
</template>

<script>
import { Button, buttonProps } from 'vue-ari'

export default {
  name: 'AppButton',
  components: {
    Button,
  },
  props: buttonProps,
}
</script>

<style lang="scss" scoped>
.app-button {
  outline: 0;
  color: #ffffff;
  background: #006dff;
  padding: 0.375em 0.75em;
  line-height: 1.5;
  border: transparent;
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: 16px;

  &:focus {
    box-shadow: 0 0 0 0.2em rgba(0, 109, 255, 0.4);
  }

  &[disabled],
  &[aria-disabled='true'] {
    cursor: auto;
    opacity: 0.5;
  }

  &:not([disabled]),
  &:not([aria-disabled='true']) {
    &:hover {
      color: #ffffff;
      background-color: #0062e6;
    }
    &:active,
    &[data-active='true'] {
      color: #ffffff;
      background-color: #004eb8;
    }
  }
}
</style>
```
