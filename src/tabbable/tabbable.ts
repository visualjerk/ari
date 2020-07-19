import { defineComponent, h } from 'vue'
import { boxProps, BoxProps, As } from '../box'

function getNativeTag(as: As) {
  if (typeof as === 'string') {
    return as
  }
  if (as.template != null && typeof as.template === 'string') {
    const matches = as.template.match(/^<(\S+?)(\s|>)/)
    return matches[1]
  }
}

function isNativeTabbable(as: As) {
  const tag = getNativeTag(as)
  return /^(button|input|select|textarea|a|audio|video)$/.test(tag)
}

export interface TabbableProps extends BoxProps {
  disabled: boolean
  focusable: boolean
}

export const tabbableProps = {
  ...boxProps,
  disabled: {
    type: Boolean,
    default: false,
  },
  focusable: {
    type: Boolean,
    default: false,
  },
}

export function useTabbable({ as, disabled, focusable }: TabbableProps) {
  const notFocusable = disabled && !focusable
  return {
    tabindex: notFocusable || isNativeTabbable(as) ? null : 0,
    disabled: notFocusable && isNativeTabbable(as) ? true : null,
    'aria-disabled': disabled ? true : null,
  }
}

export const Tabbable = defineComponent({
  props: tabbableProps,
  setup(props, { slots }) {
    return () => h(props.as, useTabbable(props), slots)
  },
})
