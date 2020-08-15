<template>
  <slot />
</template>

<script>
import { provide } from 'vue'
import { usePopoverState } from 'vue-ari'

export default {
  name: 'Popover',
  setup() {
    provide('popoverState', usePopoverState())
  },
}
</script>
