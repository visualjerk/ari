<template>
  <Clickable
    v-bind="$props"
    as="button"
    class="text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    :class="[
      $props.disabled
        ? 'bg-blue-200 cursor-not-allowed'
        : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800',
    ]"
  >
    <slot />
  </Clickable>
</template>

<script>
import { Clickable, clickableProps } from 'vue-ari'

export default {
  name: 'AppButton',
  components: {
    Clickable,
  },
  props: clickableProps,
}
</script>
