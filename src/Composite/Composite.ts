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

  props.registerContainer(Tabbable.ref)

  function handleKeydown(event: KeyboardEvent & { target: HTMLElement }) {
    switch (event.key) {
      case 'Enter':
        props.keyboard(event)
        break
      case 'ArrowDown':
      case 'ArrowRight':
        props.next()
        break
      case 'ArrowUp':
      case 'ArrowLeft':
        props.previous()
        break
    }
  }

  function handleKeyup(event: KeyboardEvent & { target: HTMLElement }) {
    switch (event.key) {
      case ' ':
        props.keyboard(event)
        break
    }
  }

  return {
    ...Tabbable,
    onKeydown: handleKeydown,
    onKeyup: handleKeyup,
    'aria-activedescendant': computed(
      () => `${props.baseId}-${props.selectedItem.value}`
    ),
  }
}

export const Composite = defineComponent(compositeProps, useComposite)
