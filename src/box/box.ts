import { defineComponent, h } from 'vue'

export interface BoxProps {
  as: String
}

export const boxProps = {
  as: {
    type: [String, Object],
    default: 'div',
  },
}

export const Box = defineComponent({
  props: boxProps,
  setup(props, { slots }) {
    return () => h(props.as, {}, slots)
  },
})
