<template>
  <div>
    <TestButton @click="handleClick">
      Button
    </TestButton>
    <TestButton disabled @click="handleClick">
      Button
    </TestButton>
  </div>
</template>

<script>
import TestButton from './MyButton.vue'

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
