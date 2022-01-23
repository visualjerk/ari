import { ComponentObjectPropsOptions } from 'vue'
import { defineComponent, useVisibilityTransition } from '../utils'
import { useBox, boxProps, BoxProps } from '../Box'
import { disclosureStateReturn, DisclosureStateReturn } from './DisclosureState'

export interface DisclosureContentProps
  extends BoxProps,
    DisclosureStateReturn {}

export const disclosureContentProps: ComponentObjectPropsOptions<DisclosureContentProps> =
  {
    ...boxProps,
    ...disclosureStateReturn,
  }

export function useDisclosureContent(props: DisclosureContentProps) {
  const box = useBox()

  useVisibilityTransition(props.visible, box.ref)

  return {
    ...box,
    id: props.baseId,
    visible: props.visible,
  }
}

export const DisclosureContent = defineComponent(
  disclosureContentProps,
  useDisclosureContent
)
