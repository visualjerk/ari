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

  function handleKeydown(event: KeyboardEvent & { target: HTMLElement }) {
    switch (event.code) {
      case 'ArrowDown':
      case 'ArrowRight':
        props.next()
        break;
      case 'ArrowUp':
      case 'ArrowLeft':
        props.previous()
        break;
    }
  }

  return {
    ...Tabbable,
    onKeydown: handleKeydown,
    'aria-activedescendant': computed(
      () => `${props.baseId}-${props.selectedItem.value}`
    ),
  }
}

export const Composite = defineComponent(compositeProps, useComposite)
