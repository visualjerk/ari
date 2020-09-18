---
description: ''
sidebar: 'docs'
prev: '/docs/'
next: '/docs/modal/'
---

# Button

Accessible `Button` component that enables users to trigger an action or event, such as submitting a form, opening a dialog, canceling an action, or performing a delete operation. It follows the [WAI-ARIA Button Pattern](https://www.w3.org/TR/wai-aria-practices/#button).

## Installation

```bash
npm i vue-ari
```

or

```bash
yarn add vue-ari
```

## Usage

```html
<template>
  <AButton v-bind="$props">
    <slot />
  </AButton>
</template>

<script>
  import { Button as AButton, buttonProps } from 'vue-ari'

  export default {
    name: 'AppButton',
    components: {
      AButton,
    },
    props: buttonProps,
  }
</script>
```

## Styling

Ari components don't include styling by default. This gives you the ability to add styles however you like.

### Example Using Tailwind

```html
<template>
  <AButton
    v-bind="$props"
    class="text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    :class="[
      $props.disabled
        ? 'bg-blue-200 cursor-not-allowed'
        : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800',
    ]"
  >
    <slot />
  </AButton>
</template>

<script>
  import { Button as AButton, buttonProps } from 'vue-ari'

  export default {
    name: 'AppButton',
    components: {
      AButton,
    },
    props: buttonProps,
  }
</script>
```
