import { computed, ref } from 'vue'
import { defineComponent, useOnElement } from '../utils'
import { boxProps, BoxProps, useBox } from '../box'

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
}

export const tabbableProps = {
  ...boxProps,
  disabled: {
    type: Boolean,
    default: false,
  },
  focusable: {
    type: Boolean,
    default: false,
  },
}

export function useTabbable(props: TabbableProps) {
  const box = useBox()
  const isNativeTabbable = useIsNativeTabbable(box.ref)
  const notFocusable = computed(() => props.disabled && !props.focusable)

  return {
    ...box,
    tabindex: computed(() =>
      notFocusable.value || isNativeTabbable.value ? null : 0
    ),
    disabled: computed(() =>
      notFocusable.value && isNativeTabbable.value ? true : null
    ),
    'aria-disabled': computed(() => (props.disabled ? true : null)),
  }
}

export const Tabbable = defineComponent(tabbableProps, useTabbable)
