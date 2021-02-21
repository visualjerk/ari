import { ComponentObjectPropsOptions } from 'vue'
import { defineComponent } from '../utils'
import { useTabbable, tabbableProps, TabbableProps } from '../Tabbable'

export type ClickableProps = TabbableProps

export const clickableProps: ComponentObjectPropsOptions<ClickableProps> = {
  ...tabbableProps,
}

export function useClickable(props: ClickableProps) {
  const tabbable = useTabbable(props)

  function handleKeydown(event: KeyboardEvent & { target: HTMLElement }) {
    if (event.target?.tagName !== 'BUTTON' && event.key === 'Enter') {
      tabbable.onClick(event)
    }
  }

  function handleKeyup(event: KeyboardEvent & { target: HTMLElement }) {
    if (event.target?.tagName !== 'BUTTON' && event.key === ' ') {
      tabbable.onClick(event)
    }
  }

  return {
    ...tabbable,
    onKeydown: handleKeydown,
    onKeyup: handleKeyup,
  }
}

export const Clickable = defineComponent(clickableProps, useClickable)
