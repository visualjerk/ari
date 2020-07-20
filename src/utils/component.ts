import {
  h,
  unref,
  defineComponent as vueDefineComponent,
  VNodeProps,
  ComponentObjectPropsOptions,
} from 'vue'

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

function refsToAttributes(refs: Object): Object {
  return Object.entries(refs).reduce(addRefToAttributes, {})
}

export function defineComponent<P extends VNodeProps>(
  componentProps: ComponentObjectPropsOptions<P>,
  useAttributeRefs: { (props: VNodeProps | P): Object }
) {
  return vueDefineComponent({
    props: componentProps,
    setup(props: VNodeProps, { slots }) {
      const attributeRefs = useAttributeRefs(props)
      return () => {
        const attributes = refsToAttributes(attributeRefs)
        return h(props.as, attributes, slots)
      }
    },
  })
}
