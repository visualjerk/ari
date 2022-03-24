import { h, unref, defineComponent as vueDefineComponent } from 'vue'
import { Portal } from '../Portal'

function addRefToAttributes(attributes, ref) {
  const [key, value] = ref

  // A template ref needs to be kept as is
  if (key === 'ref') {
    attributes[key] = value
  } else {
    attributes[key] = unref(value)
  }
  return attributes
}

export function refsToAttributes(refs) {
  return Object.entries(refs).reduce(addRefToAttributes, {})
}

export function defineComponent(componentProps, useAttributeRefs) {
  return vueDefineComponent({
    props: componentProps,
    inheritAttrs: false,
    setup(props, { slots, attrs }) {
      const attributeRefs = useAttributeRefs(props)
      return () => {
        const { withPortal, ...attributes } = refsToAttributes(attributeRefs)
        const renderedComp = h(props.as, { ...attributes, ...attrs }, slots)
        if (withPortal) {
          return h(Portal, null, () => renderedComp)
        }
        return renderedComp
      }
    },
  })
}
