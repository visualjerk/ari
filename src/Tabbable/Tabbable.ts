import { computed, ref, ComponentObjectPropsOptions, PropType } from 'vue'
import { defineComponent, useOnElement } from '../utils'
import { boxProps, BoxProps, useBox } from '../Box'

function getIsNativeTabbable(element: Element) {
  return /^(BUTTON|INPUT|SELECT|TEXTAREA|A|AUDIO|VIDEO)$/.test(element.tagName)
}

function useIsNativeTabbable(elementRef) {
  const isNativeTabbable = ref(false)
  useOnElement(elementRef, (element) => {
    isNativeTabbable.value = getIsNativeTabbable(element)
  })
  return isNativeTabbable
}

export interface TabbableProps extends BoxProps {
  disabled: boolean
  focusable: boolean
  onClick: () => void
  onMousedown: () => void
  onMouseover: () => void
}

export const tabbableProps: ComponentObjectPropsOptions<TabbableProps> = {
  ...boxProps,
  disabled: {
    type: Boolean,
    default: false,
  },
  focusable: {
    type: Boolean,
    default: false,
  },
  onClick: {
    type: Function as PropType<() => void>,
    default: null,
  },
  onMousedown: {
    type: Function as PropType<() => void>,
    default: null,
  },
  onMouseover: {
    type: Function as PropType<() => void>,
    default: null,
  },
}

export function useTabbable(props: TabbableProps) {
  const box = useBox()
  const isNativeTabbable = useIsNativeTabbable(box.ref)
  const notFocusable = computed(() => props.disabled && !props.focusable)

  const handleNativeEvent = (eventName) => (event: Event) => {
    if (props.disabled) {
      event.preventDefault()
      event.stopPropagation()
      return
    }
    return typeof props[eventName] === 'function' && props[eventName](event)
  }

  return {
    ...box,
    tabindex: computed(() =>
      notFocusable.value || isNativeTabbable.value ? null : 0
    ),
    disabled: computed(() =>
      notFocusable.value && isNativeTabbable.value ? true : null
    ),
    'aria-disabled': computed(() => (props.disabled ? true : null)),
    onClick: handleNativeEvent('onClick'),
    onMousedown: handleNativeEvent('onMousedown'),
    onMouseover: handleNativeEvent('onMouseover'),
  }
}

export const Tabbable = defineComponent(tabbableProps, useTabbable)
