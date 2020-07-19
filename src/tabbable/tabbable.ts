import { defineComponent, h } from 'vue'
import { boxProps, BoxProps } from '../box'

export interface TabbableProps extends BoxProps {
  disabled: Boolean
}

export const tabbableProps = {
  ...boxProps,
  disabled: {
    type: Boolean,
    default: false,
  },
}

export function useTabbable({ disabled }: TabbableProps) {
  return {
    tabindex: disabled ? null : 0,
  }
}

export const Tabbable = defineComponent({
  props: tabbableProps,
  setup(props, { slots }) {
    return () => h(props.as, useTabbable(props), slots)
  },
})
