import { ComponentObjectPropsOptions } from 'vue'
import { defineComponent, getTabbableElements } from '../utils'
import { useDisclosure, disclosureProps, DisclosureProps } from '../Disclosure'

export type DialogDisclosureProps = DisclosureProps

export const dialogDisclosureProps: ComponentObjectPropsOptions<DialogDisclosureProps> = {
  ...disclosureProps,
}

export function useDialogDisclosure(props: DialogDisclosureProps) {
  const Disclosure = useDisclosure(props)

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Tab' && !event.shiftKey && props.visible) {
      const dialog = document.getElementById(props.baseId)
      const tabbableElements = getTabbableElements(dialog)
      if (tabbableElements.length) {
        tabbableElements[0].focus()
        event.preventDefault()
      }
    }
  }

  return {
    ...Disclosure,
    'aria-haspopup': 'dialog',
    onKeydown: handleKeydown,
  }
}

export const DialogDisclosure = defineComponent(
  dialogDisclosureProps,
  useDialogDisclosure
)
