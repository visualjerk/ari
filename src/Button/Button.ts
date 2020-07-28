import { ComponentObjectPropsOptions, ref, computed } from 'vue'
import { defineComponent, useOnElement } from '../utils'
import { useClickable, clickableProps, ClickableProps } from '../Clickable'

export type ButtonProps = ClickableProps

export const buttonProps: ComponentObjectPropsOptions<ButtonProps> = {
  ...clickableProps,
  as: {
    type: [String, Object],
    default: 'button',
  },
}

export function useButton(props: ButtonProps) {
  const clickable = useClickable(props)

  const isButton = ref(false)
  useOnElement(clickable.ref, (element) => {
    isButton.value = element.tagName === 'BUTTON'
  })
  const isLink = ref(false)
  useOnElement(clickable.ref, (element) => {
    isLink.value = element.tagName === 'A'
  })

  return {
    ...clickable,
    type: computed(() => (isButton.value ? 'button' : null)),
    role: computed(() => (isButton.value || isLink.value ? null : 'button')),
  }
}

export const Button = defineComponent(buttonProps, useButton)
