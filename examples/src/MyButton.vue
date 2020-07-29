<template>
  <Clickable v-bind="$props" as="button" class="my-button">
    <slot />
  </Clickable>
</template>

<script>
import { Clickable, clickableProps } from 'vue-ari'

export default {
  name: 'MyButton',
  components: {
    Clickable,
  },
  props: clickableProps,
}
</script>

<style scoped>
.my-button {
  padding: 0.5em 1em;
  color: white;
  background-color: blue;
  border-radius: 0.5em;
}

.my-button[disabled] {
  opacity: 0.5;
}
</style>
