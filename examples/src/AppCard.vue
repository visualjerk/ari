<template>
  <Box
    v-bind="$props"
    as="button"
    class="rounded focus:outline-none focus:shadow-outline"
  >
    <div
      class="rounded shadow-lg border border-solid border-gray-300 py-3 px-5 bg-white text-left"
    >
      <slot />
    </div>
  </Box>
</template>

<script>
import { Box, boxProps } from 'vue-ari'

export default {
  name: 'AppCard',
  components: {
    Box,
  },
  props: boxProps,
}
</script>
