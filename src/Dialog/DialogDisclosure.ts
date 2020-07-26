import { ComponentObjectPropsOptions } from 'vue'
import { defineComponent } from '../utils'
import { useDisclosure, disclosureProps, DisclosureProps } from '../Disclosure'

export interface DialogDisclosureProps extends DisclosureProps {}

export const dialogDisclosureProps: ComponentObjectPropsOptions<DialogDisclosureProps> = {
  ...disclosureProps,
}

export function useDialogDisclosure(props: DialogDisclosureProps) {
  const Disclosure = useDisclosure(props)

  return {
    ...Disclosure,
    'aria-haspopup': 'dialog',
  }
}

export const DialogDisclosure = defineComponent(
  dialogDisclosureProps,
  useDialogDisclosure
)
