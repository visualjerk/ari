<template>
  <div>
    <DialogDisclosure v-bind="dialog" :as="TestButton">Open Dialog</DialogDisclosure>
    <Dialog v-bind="dialog">Hello Dialog</Dialog>
  </div>
</template>

<script>
import { markRaw } from 'vue'
import { Dialog, DialogDisclosure, useDialogState } from 'vue-ari'
import TestButton from './MyButton.vue'

export default {
  name: 'App',
  components: {
    Dialog,
    DialogDisclosure,
  },
  setup() {
    const dialog = useDialogState()
    return { dialog, TestButton: markRaw(TestButton) }
  },
  methods: {
    handleClick() {
      alert('clicked')
    },
  },
}
</script>
