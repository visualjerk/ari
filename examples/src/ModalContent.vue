<template>
  <AModal v-bind="modal" :as="AppCard" class="max-w-xs">
    <slot />
  </AModal>
</template>

<script>
import { inject, markRaw } from 'vue'
import { Modal as AModal } from 'vue-ari'
import AppCard from './AppCard.vue'

export default {
  name: 'ModalContent',
  components: {
    AModal,
  },
  setup() {
    const modal = inject('modalState')
    return {
      modal,
      AppCard: markRaw(AppCard),
    }
  },
}
</script>
