<template>
  <APopoverDisclosure v-bind="popover" :as="AppButton">
    <slot />
  </APopoverDisclosure>
</template>

<script>
import { inject, markRaw } from 'vue'
import { PopoverDisclosure as APopoverDisclosure } from 'vue-ari'
import AppButton from './AppButton.vue'

export default {
  name: 'PopoverDisclosure',
  components: {
    APopoverDisclosure,
  },
  setup() {
    const popover = inject('popoverState')
    return {
      popover,
      AppButton: markRaw(AppButton),
    }
  },
}
</script>
