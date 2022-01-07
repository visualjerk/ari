import { computed, unref, ComponentObjectPropsOptions } from 'vue'
import { defineComponent } from '../utils'
import {
  useCompositeItem,
  compositeItemProps,
  CompositeItemProps,
} from '../Composite'

export type RadioProps = CompositeItemProps

export const radioProps: ComponentObjectPropsOptions<CompositeItemProps> = {
  ...compositeItemProps,
  as: {
    type: [String, Object],
    default: 'input',
  },
}

export function useRadio(props: RadioProps) {
  const composite = useCompositeItem(props)

  return {
    ...composite,
    type: 'radio',
    checked: composite['aria-selected'],
    'aria-checked': computed(() =>
      unref(composite['aria-selected']) ? 'true' : 'false'
    ),
  }
}

export const Radio = defineComponent(radioProps, useRadio)
