<template>
  <PopoverDisclosure v-bind="popover" :as="AppButton">
    <slot />
  </PopoverDisclosure>
</template>

<script>
import { inject, markRaw } from 'vue'
import { PopoverDisclosure } from 'vue-ari'
import AppButton from './AppButton.vue'

export default {
  name: 'PopoverDisclosure',
  components: {
    PopoverDisclosure,
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
