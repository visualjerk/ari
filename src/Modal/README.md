---
description: ''
sidebar: 'docs'
prev: '/docs/button/'
next: '/docs/popover/'
---

# Modal

Accessible `Modal` component that follows the [WAI-ARIA Dialog (Modal) Pattern](https://www.w3.org/TR/wai-aria-practices/#dialog_modal). It is rendered within a Portal.

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
  <ModalDisclosure v-bind="modal">
    Open Modal
  </ModalDisclosure>
  <ModalBackdrop v-bind="modal">
    <Modal v-bind="modal">
      Modal Content
    </Modal>
  </ModalBackdrop>
</template>

<script>
  import { Modal, ModalBackdrop, ModalDisclosure, useModalState } from 'vue-ari'

  export default {
    components: {
      Modal,
      ModalBackdrop,
      ModalDisclosure,
    },
    setup() {
      const modal = useModalState()
      return {
        modal,
      }
    },
  }
</script>
```

## Styling

Ari components don't include styling by default. This gives you the ability to add styles however you like.

### Example Using Tailwind

```html
<template>
  <ModalDisclosure
    v-bind="modal"
    class="text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
  >
    Open Modal
  </ModalDisclosure>
  <ModalBackdrop
    v-bind="modal"
    class="fixed inset-0 flex items-center justify-center bg-opacity-75 bg-black"
  >
    <Modal
      v-bind="modal"
      class="max-w-xs rounded shadow-lg border border-solid border-gray-300 py-3 px-5 bg-white"
    >
      Modal Content
    </Modal>
  </ModalBackdrop>
</template>

<script>
  import { Modal, ModalDisclosure, useModalState } from 'vue-ari'

  export default {
    components: {
      Modal,
      ModalDisclosure,
    },
    setup() {
      const modal = useModalState()
      return {
        modal,
      }
    },
  }
</script>
```

## Reusable Components

It would get pretty verbose to add the same styling classes wherever you like to use a `Modal`. So the recommended way is wrapping Ari components inside your own base components and use them inside your app.

Base component for disclosure:

```html
<template>
  <ModalDisclosure
    v-bind="$props"
    class="text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
  >
    <slot />
  </ModalDisclosure>
</template>

<script>
  import { ModalDisclosure, modalDisclosureProps } from 'vue-ari'

  export default {
    name: 'AppModalDisclosure',
    props: modalDisclosureProps,
    components: {
      ModalDisclosure,
    },
  }
</script>
```

Base component for modal:

```html
<template>
  <ModalBackdrop
    v-bind="$props"
    class="fixed inset-0 flex items-center justify-center bg-opacity-75 bg-black"
  >
    <Modal
      v-bind="{ ...$props, ...$attrs }"
      class="max-w-xs rounded shadow-lg border border-solid border-gray-300 py-3 px-5 bg-white"
    >
      <slot />
    </Modal>
  </ModalBackdrop>
</template>

<script>
  import { Modal, ModalBackdrop, modalProps } from 'vue-ari'

  export default {
    name: 'AppModal',
    props: modalProps,
    inheritAttrs: false,
    components: {
      Modal,
      ModalBackdrop,
    },
  }
</script>
```

Inside your app:

```html
<template>
  <AppModalDisclosure v-bind="modal">
    Open Modal
  </AppModalDisclosure>
  <AppModal v-bind="modal">
    Modal Content
  </AppModal>
</template>

<script>
  import { useModalState } from 'vue-ari'
  import { AppModal, AppModalDisclosure } from './components'

  export default {
    components: {
      AppModal,
      AppModalDisclosure,
    },
    setup() {
      const modal = useModalState()
      return {
        modal,
      }
    },
  }
</script>
```

## Abstracting State

If you would rather not create a modal state each time, just create a provider component.

Provider component:

```html
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

```html
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

```html
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

```html
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
