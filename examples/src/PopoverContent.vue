<template>
  <APopover v-bind="popover" :as="AppCard" class="max-w-xs">
    <slot />
  </APopover>
</template>

<script>
import { inject, markRaw } from 'vue'
import { Popover as APopover } from 'vue-ari'
import AppCard from './AppCard.vue'

export default {
  name: 'PopoverContent',
  components: {
    APopover,
  },
  setup() {
    const popover = inject('popoverState')
    return {
      popover,
      AppCard: markRaw(AppCard),
    }
  },
}
</script>
