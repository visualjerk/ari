import { defineComponent } from '../utils'
import { ComponentOptions, ComponentObjectPropsOptions, ref } from 'vue'

export type As = string | ComponentOptions

export interface BoxProps {
  as: As
}

export const boxProps: ComponentObjectPropsOptions<BoxProps> = {
  as: {
    type: [String, Object],
    default: 'div',
  },
}

export function useBox() {
  return {
    ref: ref(null),
  }
}

export const Box = defineComponent(boxProps, useBox)
