import { defineComponent, h } from 'vue'

export const Box = defineComponent({
  setup(_, { slots }) {
    return () => h('div', {}, slots)
  },
})
