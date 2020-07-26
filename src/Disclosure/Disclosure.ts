import { ComponentObjectPropsOptions, computed } from 'vue'
import { defineComponent } from '../utils'
import { useButton, buttonProps, ButtonProps } from '../Button'
import { disclosureStateReturn, DisclosureStateReturn } from './DisclosureState'

export interface DisclosureProps extends ButtonProps, DisclosureStateReturn {}

export const disclosureProps: ComponentObjectPropsOptions<DisclosureProps> = {
  ...buttonProps,
  ...disclosureStateReturn,
}

export function useDisclosure(props: DisclosureProps) {
  const button = useButton(props)

  return {
    ...button,
    'aria-expanded': computed(() => (props.visible ? 'true' : 'false')),
    'aria-controls': props.baseId,
    onClick: props.toggle,
  }
}

export const Disclosure = defineComponent(disclosureProps, useDisclosure)
