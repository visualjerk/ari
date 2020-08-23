---
description: ''
sidebar: 'docs'
next: '/docs/modal/'
---

# Introduction

Ari offers accessible Vue 3 components without styling. It helps building a11y compliant components without having to overwrite default styles.

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
  <PopoverDisclosure v-bind="popover">
    Open Popover
  </PopoverDisclosure>
  <Popover v-bind="popover">
    Popover Content
  </Popover>
</template>

<script>
  import { Popover, PopoverDisclosure, usePopoverState } from 'vue-ari'

  export default {
    components: {
      Popover,
      PopoverDisclosure,
    },
    setup() {
      const popover = usePopoverState()
      return {
        popover,
      }
    },
  }
</script>
```
