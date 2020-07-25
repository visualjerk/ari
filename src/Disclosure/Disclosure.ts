import { ComponentObjectPropsOptions, computed } from 'vue'
import { defineComponent } from '../utils'
import { useButton, buttonProps, ButtonProps } from '../button'

export interface DisclosureProps extends ButtonProps {
  baseId: string
  visible: boolean
}

export const disclosureProps: ComponentObjectPropsOptions<DisclosureProps> = {
  ...buttonProps,
  baseId: {
    type: String,
    required: true,
  },
  visible: {
    type: Boolean,
    required: true,
  },
}

export function useDisclosure(props: DisclosureProps) {
  const button = useButton(props)

  return {
    ...button,
    'aria-expanded': computed(() => (props.visible ? 'true' : 'false')),
    'aria-controls': props.baseId,
  }
}

export const Disclosure = defineComponent(disclosureProps, useDisclosure)
