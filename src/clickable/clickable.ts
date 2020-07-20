import { ComponentObjectPropsOptions } from 'vue'
import { defineComponent } from '../utils'
import { useTabbable, tabbableProps, TabbableProps } from '../tabbable'

export interface ClickableProps extends TabbableProps {}

export const clickableProps: ComponentObjectPropsOptions<ClickableProps> = {
  ...tabbableProps,
}

export function useClickable(props: ClickableProps) {
  return {
    ...useTabbable(props),
  }
}

export const Clickable = defineComponent(clickableProps, useClickable)
