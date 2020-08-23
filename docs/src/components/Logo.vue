<template>
  <svg
    :width="getWidth"
    :height="getHeight"
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M104 104V60C104 35.6995 84.3005 16 60 16C35.6995 16 16 35.6995 16 60C16 84.3005 35.6995 104 60 104H104ZM120 110C120 115.523 115.523 120 110 120H60C26.8629 120 0 93.1371 0 60C0 26.8629 26.8629 0 60 0C93.1371 0 120 26.8629 120 60V110Z"
      fill="currentColor"
    />
    <path
      d="M66.0622 83.5C63.3679 88.1667 56.6321 88.1667 53.9378 83.5L36.6173 53.5C33.923 48.8333 37.2909 43 42.6795 43L77.3205 43C82.7091 43 86.077 48.8333 83.3827 53.5L66.0622 83.5Z"
      fill="#F23E74"
    />
  </svg>
</template>

<script>
export default {
  props: {
    width: {
      type: Number,
      default: 40,
    },
  },

  computed: {
    getWidth() {
      return this.width
    },

    getHeight() {
      return Math.ceil((this.getWidth / 120) * 120)
    },
  },
}
</script>

<style scoped>
svg {
  @apply text-ui-primary;
}
</style>
