import {
  h,
  unref,
  defineComponent as vueDefineComponent,
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

export function defineComponent<P extends Object>(
  componentProps: ComponentObjectPropsOptions<P>,
  useAttributeRefs: { (props: Object | P): Object }
): any & JSX.Element {
  return vueDefineComponent({
    props: componentProps,
    setup(props: Object, { slots }) {
      const attributeRefs = useAttributeRefs(props)
      return () => {
        const attributes = refsToAttributes(attributeRefs)
        return h(props.as, attributes, slots)
      }
    },
  })
}
