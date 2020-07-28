import { h, unref, defineComponent as vueDefineComponent } from 'vue'

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
    setup(props, { slots }) {
      const attributeRefs = useAttributeRefs(props)
      return () => {
        const attributes = refsToAttributes(attributeRefs)
        return h(props.as, attributes, slots)
      }
    },
  })
}
