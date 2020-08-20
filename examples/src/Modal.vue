<template>
  <slot />
</template>

<script>
import { provide } from 'vue'
import { useModalState } from 'vue-ari'

export default {
  name: 'Modal',
  setup() {
    provide('modalState', useModalState())
  },
}
</script>
