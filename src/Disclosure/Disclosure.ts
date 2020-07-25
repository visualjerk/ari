import { ComponentObjectPropsOptions, computed } from 'vue'
import { defineComponent } from '../utils'
import { useButton, buttonProps, ButtonProps } from '../Button'
import { DisclosureStateProps, disclosureStateProps } from './disclosureState'

export interface DisclosureProps extends ButtonProps, DisclosureStateProps {}

export const disclosureProps: ComponentObjectPropsOptions<DisclosureProps> = {
  ...buttonProps,
  ...disclosureStateProps,
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
