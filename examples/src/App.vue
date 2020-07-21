<template>
  <div>
    <Clickable @click="handleClick">Clickable</Clickable>
    <Clickable @click="handleClick" disabled>Clickable disabled</Clickable>
    <Clickable @click="handleClick" disabled focusable
      >Clickable focusable</Clickable
    >
    <Clickable @click="handleClick" as="button">Clickable button</Clickable>
    <Tabbable @click="handleClick">Tabbable</Tabbable>
    <Tabbable @click="handleClick" disabled>Tabbable disabled</Tabbable>
    <Tabbable @click="handleClick" disabled focusable
      >Tabbable focusable</Tabbable
    >
    <Tabbable @click="handleClick" as="button">Tabbable button</Tabbable>
  </div>
</template>

<script>
import { Clickable } from 'ari-vue/src/clickable'
import { Tabbable } from 'ari-vue/src/tabbable'

export default {
  name: 'App',
  components: {
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
