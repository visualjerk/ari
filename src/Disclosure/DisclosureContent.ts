import { ComponentObjectPropsOptions, computed } from 'vue'
import { defineComponent } from '../utils'
import { useBox, boxProps, BoxProps } from '../Box'
import { disclosureStateReturn, DisclosureStateReturn } from './DisclosureState'

export interface DisclosureContentProps
  extends BoxProps,
    DisclosureStateReturn {}

export const disclosureContentProps: ComponentObjectPropsOptions<DisclosureContentProps> = {
  ...boxProps,
  ...disclosureStateReturn,
}

export function useDisclosureContent(props: DisclosureContentProps) {
  const Box = useBox()

  return {
    ...Box,
    id: props.baseId,
    style: computed(() => (props.visible ? null : 'display: none;')),
    hidden: computed(() => (props.visible ? null : true)),
  }
}

export const DisclosureContent = defineComponent(
  disclosureContentProps,
  useDisclosureContent
)
