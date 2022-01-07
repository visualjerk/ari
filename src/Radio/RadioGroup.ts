import { ComponentObjectPropsOptions } from 'vue'
import { defineComponent } from '../utils'
import { useComposite, compositeProps, CompositeProps } from '../Composite'

export type RadioGroupProps = CompositeProps

export const radioGroupProps: ComponentObjectPropsOptions<RadioGroupProps> = {
  ...compositeProps,
}

export function useRadioGroup(props: RadioGroupProps) {
  const composite = useComposite(props)

  return {
    ...composite,
  }
}

export const RadioGroup = defineComponent(radioGroupProps, useRadioGroup)
