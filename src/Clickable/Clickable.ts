import { ComponentObjectPropsOptions } from 'vue'
import { defineComponent } from '../utils'
import { useTabbable, tabbableProps, TabbableProps } from '../Tabbable'

export interface ClickableProps extends TabbableProps {}

export const clickableProps: ComponentObjectPropsOptions<ClickableProps> = {
  ...tabbableProps,
}

export function useClickable(props: ClickableProps) {
  const tabbable = useTabbable(props)

  function handleKeydown(event: KeyboardEvent & { target: HTMLElement }) {
    if (
      event.target?.tagName !== 'BUTTON' &&
      [' ', 'Enter'].includes(event.key)
    ) {
      tabbable.onClick(event)
    }
  }

  return {
    ...tabbable,
    onKeydown: handleKeydown,
  }
}

export const Clickable = defineComponent(clickableProps, useClickable)
