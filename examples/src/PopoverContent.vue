<template>
  <Popover v-bind="popover" :as="AppCard" class="max-w-xs">
    <slot />
  </Popover>
</template>

<script>
import { inject, markRaw } from 'vue'
import { Popover } from 'vue-ari'
import AppCard from './AppCard.vue'

export default {
  name: 'PopoverContent',
  components: {
    Popover,
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
