# Ari

[![CI](https://github.com/visualjerk/ari/workflows/CI/badge.svg)](https://github.com/visualjerk/ari/actions)
[![Test Coverage](https://codecov.io/gh/visualjerk/ari/branch/master/graph/badge.svg)](https://codecov.io/gh/visualjerk/ari)

Accessible unstyled Vue components inspired by Reakit.

Try it on [Stackblitz](https://stackblitz.com/edit/vue-grjxen?file=src/App.vue).

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

## Abstracting State

If you would rather not create a modal state each time, just create a provider component.

Provider component:

```vue
<template>
  <slot />
</template>

<script>
import { provide } from 'vue'
import { useModalState } from 'vue-ari'

export default {
  name: 'AppModalProvider',
  setup() {
    provide('modalState', useModalState())
  },
}
</script>
```

Base component for disclosure:

```vue
<template>
  <ModalDisclosure
    v-bind="modal"
    class="text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
  >
    <slot />
  </ModalDisclosure>
</template>

<script>
import { inject } from 'vue'
import { ModalDisclosure } from 'vue-ari'

export default {
  name: 'AppModalDisclosure',
  components: {
    ModalDisclosure,
  },
  setup() {
    const modal = inject('modalState')
    return {
      modal,
    }
  },
}
</script>
```

Base component for modal:

```vue
<template>
  <ModalBackdrop
    v-bind="modal"
    class="fixed inset-0 flex items-center justify-center bg-opacity-75 bg-black"
  >
    <Modal
      v-bind="{ ...modal, ...$attrs }"
      class="max-w-xs rounded shadow-lg border border-solid border-gray-300 py-3 px-5 bg-white"
    >
      <slot />
    </Modal>
  </ModalBackdrop>
</template>

<script>
import { inject } from 'vue'
import { Modal, ModalBackdrop } from 'vue-ari'

export default {
  name: 'AppModalDisclosure',
  components: {
    Modal,
    ModalBackdrop,
  },
  inheritAttrs: false,
  setup() {
    const modal = inject('modalState')
    return {
      modal,
    }
  },
}
</script>
```

Inside your app:

```vue
<template>
  <AppModalProvider>
    <AppModalDisclosure>
      Open Modal
    </AppModalDisclosure>
    <AppModal>
      Modal Content
    </AppModal>
  </AppModalProvider>
</template>

<script>
import { AppModalProvider, AppModal, AppModalDisclosure } from './components'

export default {
  components: {
    AppModalProvider,
    AppModal,
    AppModalDisclosure,
  },
}
</script>
```
