<template>
  <div>
    <TestButton @click="handleClick">Button</TestButton>
    <TestButton @click="handleClick" disabled>Button</TestButton>
  </div>
</template>

<script>
import { Clickable } from 'ari-vue/src/clickable'
import { Tabbable } from 'ari-vue/src/tabbable'
import TestButton from './TestButton.vue'

export default {
  name: 'App',
  components: {
    TestButton,
    Clickable,
    Tabbable,
  },
  methods: {
    handleClick() {
      alert('clicked')
    },
  },
}
</script>
