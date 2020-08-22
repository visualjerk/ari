<template>
  <AModalBackdrop
    v-bind="modal"
    class="fixed inset-0 flex items-center justify-center bg-opacity-75 bg-black"
  >
    <AModal v-bind="{ ...modal, ...$attrs }" :as="AppCard" class="max-w-xs">
      <slot />
    </AModal>
  </AModalBackdrop>
</template>

<script>
import { inject, markRaw } from 'vue'
import { Modal as AModal } from 'vue-ari'
import { ModalBackdrop as AModalBackdrop } from 'vue-ari'
import AppCard from './AppCard.vue'

export default {
  name: 'ModalContent',
  components: {
    AModal,
    AModalBackdrop,
  },
  inheritAttrs: false,
  setup() {
    const modal = inject('modalState')
    return {
      modal,
      AppCard: markRaw(AppCard),
    }
  },
}
</script>
