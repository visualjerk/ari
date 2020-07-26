import { ComponentObjectPropsOptions, defineComponent, h } from 'vue'
import { refsToAttributes } from '../utils'
import {
  useDisclosureContent,
  disclosureContentProps,
  DisclosureContentProps,
} from '../Disclosure'
import { Portal } from '../Portal'

export interface DialogProps extends DisclosureContentProps {}

export const dialogProps: ComponentObjectPropsOptions<DialogProps> = {
  ...disclosureContentProps,
}

export function useDialog(props: DialogProps) {
  const disclosureContent = useDisclosureContent(props)

  return {
    role: 'dialog',
    tabindex: -1,
    ...disclosureContent,
  }
}

export const Dialog = defineComponent({
  props: dialogProps,
  setup(props: DialogProps, { slots }) {
    const attributeRefs = useDialog(props)
    return () => {
      const attributes = refsToAttributes(attributeRefs)
      return h(Portal, null, h(props.as, attributes, slots))
    }
  },
})
