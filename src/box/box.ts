import { defineComponent, h, ComponentOptions } from 'vue'

export type As = string | ComponentOptions

export interface BoxProps {
  as: As
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
