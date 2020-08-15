import { ComponentObjectPropsOptions } from 'vue'
import { defineComponent } from '../utils'
import {
  useDialogDisclosure,
  dialogDisclosureProps,
  DialogDisclosureProps,
} from '../Dialog'

export type PopoverDisclosureProps = DialogDisclosureProps

export const popoverDisclosureProps: ComponentObjectPropsOptions<PopoverDisclosureProps> = {
  ...dialogDisclosureProps,
}

export function usePopoverDisclosure(props: PopoverDisclosureProps) {
  const disclosure = useDialogDisclosure(props)

  return {
    ...disclosure,
  }
}

export const PopoverDisclosure = defineComponent(
  popoverDisclosureProps,
  usePopoverDisclosure
)
