import { ComponentObjectPropsOptions } from 'vue'
import { defineComponent } from '../utils'
import {
  useDialogDisclosure,
  dialogDisclosureProps,
  DialogDisclosureProps,
} from '../Dialog'

export type ModalDisclosureProps = DialogDisclosureProps

export const modalDisclosureProps: ComponentObjectPropsOptions<ModalDisclosureProps> = {
  ...dialogDisclosureProps,
}

export function useModalDisclosure(props: ModalDisclosureProps) {
  const disclosure = useDialogDisclosure(props)

  return {
    ...disclosure,
  }
}

export const ModalDisclosure = defineComponent(
  modalDisclosureProps,
  useModalDisclosure
)
