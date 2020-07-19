import { defineComponent, h } from 'vue'
import { useTabbable, tabbableProps, TabbableProps } from '../tabbable'

export interface ClickableProps extends TabbableProps {
  onClick: Function
}

export const clickableProps = {
  ...tabbableProps,
  onClick: {
    type: Function,
    default: null,
  },
}

export function useClickable({ onClick: _onClick, ...props }: ClickableProps) {
  const onClick = function (event) {
    if (props.disabled) {
      event.preventDefault()
      event.stopPropagation()
      return
    }
    return typeof _onClick === 'function' && _onClick(event)
  }

  return {
    ...useTabbable(props),
    onClick,
  }
}

export const Clickable = defineComponent({
  props: clickableProps,
  setup(props, { slots }) {
    return () => h(props.as, useClickable(props), slots)
  },
})
