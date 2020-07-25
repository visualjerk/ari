<template>
  <div>
    <TestButton @click="handleClick">Button</TestButton>
    <TestButton @click="handleClick" disabled>Button</TestButton>
  </div>
</template>

<script>
import TestButton from './TestButton.vue'

export default {
  name: 'App',
  components: {
    TestButton,
  },
  methods: {
    handleClick() {
      alert('clicked')
    },
  },
}
</script>
