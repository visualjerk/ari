import {
  ComponentObjectPropsOptions,
  Ref,
  defineComponent,
  watch,
  onBeforeUnmount,
  h,
} from 'vue'
import {
  refsToAttributes,
  getTabbableElements,
  getNextTabbable,
  elementIsWithin,
  focusIsWithin,
} from '../utils'
import {
  useDisclosureContent,
  disclosureContentProps,
  DisclosureContentProps,
} from '../Disclosure'
import { Portal } from '../Portal'

export type DialogProps = DisclosureContentProps

export const dialogProps: ComponentObjectPropsOptions<DialogProps> = {
  ...disclosureContentProps,
}

function useHideOnClickOutside(props: DialogProps, ref: Ref<HTMLElement>) {
  const { hide } = props

  function hideOnClickOutside(event: MouseEvent) {
    if (!elementIsWithin(ref.value, event.target as HTMLElement)) {
      hide()
    }
  }

  watch(
    () => props.visible,
    (visible) => {
      if (visible) {
        document.addEventListener('click', hideOnClickOutside)
      } else {
        document.removeEventListener('click', hideOnClickOutside)
      }
    }
  )

  onBeforeUnmount(() => {
    document.removeEventListener('click', hideOnClickOutside)
  })
}

function useHideOnFocusOutside(props: DialogProps, ref: Ref<HTMLElement>) {
  const { hide, baseId } = props

  function hideOnFocusOutside(event: FocusEvent) {
    const disclosure: HTMLElement = document.querySelector(
      `[aria-controls="${baseId}"]`
    )
    if (
      props.visible &&
      !elementIsWithin(ref.value, event.target as HTMLElement) &&
      !elementIsWithin(disclosure, event.target as HTMLElement)
    ) {
      hide()
    }
  }

  watch(
    () => props.visible,
    (visible) => {
      if (visible) {
        document.addEventListener('focusin', hideOnFocusOutside)
      } else {
        document.removeEventListener('focusin', hideOnFocusOutside)
      }
    }
  )

  onBeforeUnmount(() => {
    document.removeEventListener('focusin', hideOnFocusOutside)
  })
}

function focusFirstFocusable(element: HTMLElement) {
  const elementToFocus = getTabbableElements(element)[0] || element
  elementToFocus.focus()
}

function useHandleToggleFocus(props: DialogProps, ref: Ref<HTMLElement>) {
  watch(
    () => props.visible,
    (visible) => {
      if (visible) {
        focusFirstFocusable(ref.value)
      } else if (focusIsWithin(ref.value)) {
        const disclosure: HTMLElement = document.querySelector(
          `[aria-controls="${props.baseId}"]`
        )
        disclosure.focus()
      }
    }
  )
}

function handleTab(
  event: KeyboardEvent,
  props: DialogProps,
  ref: Ref<HTMLElement>
) {
  const disclosure: HTMLElement = document.querySelector(
    `[aria-controls="${props.baseId}"]`
  )
  const tabbableElements = getTabbableElements(ref.value)
  if (!event.shiftKey && reachedLastTabbable(tabbableElements)) {
    getNextTabbable(disclosure)?.focus()
    event.preventDefault()
  } else if (event.shiftKey && reachedFirstTabbable(tabbableElements)) {
    disclosure.focus()
    event.preventDefault()
  }

  function reachedLastTabbable(tabbableElements) {
    return (
      !tabbableElements.length ||
      tabbableElements[tabbableElements.length - 1] === document.activeElement
    )
  }

  function reachedFirstTabbable(tabbableElements) {
    return (
      !tabbableElements.length || tabbableElements[0] === document.activeElement
    )
  }
}

export function useDialog(props: DialogProps) {
  const disclosureContent = useDisclosureContent(props)
  const { ref } = disclosureContent
  useHideOnClickOutside(props, ref)
  useHideOnFocusOutside(props, ref)
  useHandleToggleFocus(props, ref)

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      props.hide()
    }
    if (event.key === 'Tab') {
      handleTab(event, props, ref)
    }
  }

  return {
    role: 'dialog',
    tabindex: -1,
    onKeydown: handleKeydown,
    ...disclosureContent,
  }
}

export const Dialog = defineComponent({
  inheritAttrs: false,
  props: dialogProps,
  setup(props: DialogProps, { slots, attrs }) {
    const attributeRefs = useDialog(props)
    return () => {
      const attributes = refsToAttributes(attributeRefs)
      return h(Portal, null, h(props.as, { ...attributes, ...attrs }, slots))
    }
  },
})
