import { ref, Ref, ComponentObjectPropsOptions, PropType } from 'vue'
import {
  CompositeStateReturn,
  compositeStateReturn,
  useCompositeState,
} from '../Composite'

export type RadioStateReturn = CompositeStateReturn & {
  currentValue: Ref<string | number | null>
  setCurrentValue: (value: string | number | null) => void
}

export const radioStateReturn: ComponentObjectPropsOptions<RadioStateReturn> = {
  ...compositeStateReturn,
  currentValue: {
    required: true,
  },
  setCurrentValue: {
    type: Function as PropType<() => void>,
  },
}

export function useRadioState(): RadioStateReturn {
  const composite = useCompositeState()
  const currentValue: Ref<string | number | null> = ref(null)

  function setCurrentValue(value: string | number | null) {
    currentValue.value = value
  }

  return {
    ...composite,
    currentValue,
    setCurrentValue,
  }
}
