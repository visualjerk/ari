import { defineComponent as vueDefineComponent, h, unref } from 'vue'

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

function refsToAttributes(refs) {
  return Object.entries(refs).reduce(addRefToAttributes, {})
}

export function defineComponent(componentProps, use = (_) => ({})) {
  return vueDefineComponent({
    props: componentProps,
    setup(props, { slots }) {
      const attributeRefs = use(props)
      return () => {
        const attributes = refsToAttributes(attributeRefs)
        return h(props.as, attributes, slots)
      }
    },
  })
}
