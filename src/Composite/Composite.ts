import { ComponentObjectPropsOptions, computed } from 'vue'
import { defineComponent } from '../utils'
import { useTabbable, tabbableProps, TabbableProps } from '../Tabbable'
import { compositeStateReturn, CompositeStateReturn } from './CompositeState'

export interface CompositeProps extends TabbableProps, CompositeStateReturn {}

export const compositeProps: ComponentObjectPropsOptions<CompositeProps> = {
  ...tabbableProps,
  ...compositeStateReturn,
}

export function useComposite(props: CompositeProps) {
  const Tabbable = useTabbable(props)

  return {
    ...Tabbable,
    'aria-activedescendant': computed(
      () => `${props.baseId}-${props.selectedItem.value}`
    ),
  }
}

export const Composite = defineComponent(compositeProps, useComposite)
