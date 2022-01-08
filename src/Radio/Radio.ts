import { computed, unref, ComponentObjectPropsOptions } from 'vue'
import { defineComponent } from '../utils'
import {
  useCompositeItem,
  compositeItemProps,
  CompositeItemProps,
} from '../Composite'
import { radioStateReturn, RadioStateReturn } from './RadioState'

export type RadioProps = CompositeItemProps &
  RadioStateReturn & {
    value: string | number
  }

export const radioProps: ComponentObjectPropsOptions<RadioProps> = {
  ...compositeItemProps,
  ...radioStateReturn,
  as: {
    type: [String, Object],
    default: 'input',
  },
  value: {
    required: true,
  },
}

export function useRadio(props: RadioProps) {
  const composite = useCompositeItem(props)

  const checked = computed(() => unref(props.currentValue) === props.value)

  function onClick() {
    props.setCurrentValue(props.value)
  }

  return {
    ...composite,
    type: 'radio',
    checked,
    'aria-checked': computed(() => (unref(checked) ? 'true' : 'false')),
    onClick,
  }
}

export const Radio = defineComponent(radioProps, useRadio)
