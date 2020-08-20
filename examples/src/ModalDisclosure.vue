<template>
  <AModalDisclosure v-bind="modal" :as="AppButton">
    <slot />
  </AModalDisclosure>
</template>

<script>
import { inject, markRaw } from 'vue'
import { ModalDisclosure as AModalDisclosure } from 'vue-ari'
import AppButton from './AppButton.vue'

export default {
  name: 'ModalDisclosure',
  components: {
    AModalDisclosure,
  },
  setup() {
    const modal = inject('modalState')
    return {
      modal,
      AppButton: markRaw(AppButton),
    }
  },
}
</script>
