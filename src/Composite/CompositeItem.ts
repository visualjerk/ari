import { ComponentObjectPropsOptions, computed } from 'vue'
import { defineComponent } from '../utils'
import { useClickable, clickableProps, ClickableProps } from '../Clickable'
import { compositeStateReturn, CompositeStateReturn } from './CompositeState'

export interface CompositeItemProps extends ClickableProps, CompositeStateReturn {}

export const compositeItemProps: ComponentObjectPropsOptions<CompositeItemProps> = {
  ...clickableProps,
  ...compositeStateReturn,
}

export function useCompositeItem(props: CompositeItemProps) {
  const Clickable = useClickable(props)

  const itemId = props.registerItem(Clickable.ref)

  function handleFocus() {
    const compositeEl = Clickable.ref.value.parentElement
    compositeEl.focus()
  }

  function handleClick() {
    props.move(itemId)
  }

  return {
    ...Clickable,
    onFocus: handleFocus,
    onClick: handleClick,
    tabindex: -1,
    id: computed( () => `${props.baseId}-${itemId}`),
    'aria-selected': computed(
      () => props.selectedItem.value === itemId ? 'true' : null
    ),
  }
}

export const CompositeItem = defineComponent(compositeItemProps, useCompositeItem)
