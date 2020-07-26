import { ComponentObjectPropsOptions, computed } from 'vue'
import { defineComponent } from '../utils'
import { disclosureStateProps, DisclosureStateProps } from './DisclosureState'
import { useBox, boxProps, BoxProps } from '../Box'

export interface DisclosureContentProps
  extends BoxProps,
    DisclosureStateProps {}

export const disclosureContentProps: ComponentObjectPropsOptions<DisclosureContentProps> = {
  ...boxProps,
  ...disclosureStateProps,
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
