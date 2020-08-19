# Ari

[![CI](https://github.com/visualjerk/ari/workflows/CI/badge.svg)](https://github.com/visualjerk/ari/actions)
[![Test Coverage](https://codecov.io/gh/visualjerk/ari/branch/master/graph/badge.svg)](https://codecov.io/gh/visualjerk/ari)

Accessible unstyled Vue components inspired by Reakit.

Try it on [Codesandbox](https://codesandbox.io/s/ari-tailwind-playground-x3e47?file=/src/App.vue).

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

## Styling

Ari components don't include styling by default. This gives you the ability to add styles however you like.

### Example Using Tailwind

```vue
<template>
  <PopoverDisclosure
    v-bind="popover"
    class="text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
  >
    Open Popover
  </PopoverDisclosure>
  <Popover
    v-bind="popover"
    class="rounded shadow-lg border border-solid border-gray-300 py-3 px-5 bg-white"
  >
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

## Reusable Components

It would get pretty verbose to add the same styling classes wherever you like to use a `Popover`. So the recommended way is wrapping Ari components inside your own base components and use them inside your app.

```vue
<template>
  <PopoverDisclosure
    v-bind="$props"
    class="text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
  >
    <slot />
  </PopoverDisclosure>
</template>

<script>
import { PopoverDisclosure, popoverDisclosureProps } from 'vue-ari'

export default {
  name: 'AppPopoverDisclosure',
  props: popoverDisclosureProps,
  components: {
    PopoverDisclosure,
  },
}
</script>
```
