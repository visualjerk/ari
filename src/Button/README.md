# Button

Accessible `Button` component that enables users to trigger an action or event, such as submitting a Form, opening a Dialog, canceling an action, or performing a delete operation. It follows the [WAI-ARIA Button Pattern](https://www.w3.org/TR/wai-aria-practices/#button).

## Installation

```bash
npm i vue-ari
```

or

```bash
yarn add vue-ari
```

## Usage

Ari components are meant to be used as base components for you own components.

They bring the functionality, you bring the styles.

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
