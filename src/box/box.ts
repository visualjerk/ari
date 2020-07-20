import { defineComponent } from '../utils'
import { ComponentOptions, ref } from 'vue'

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

export function useBox() {
  return {
    ref: ref(null),
  }
}

export const Box = defineComponent(boxProps, useBox)
