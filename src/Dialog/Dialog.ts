import {
  ComponentObjectPropsOptions,
  Ref,
  defineComponent,
  watch,
  onBeforeUnmount,
  h,
} from 'vue'
import { refsToAttributes, getFocusableElements } from '../utils'
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
    if (!ref.value?.contains(event.target as HTMLElement)) {
      hide()
    }
  }

  watch(
    () => props.visible,
    (visible) => {
      if (visible) {
        window.addEventListener('click', hideOnClickOutside)
      } else {
        window.removeEventListener('click', hideOnClickOutside)
      }
    }
  )

  onBeforeUnmount(() => {
    window.removeEventListener('click', hideOnClickOutside)
  })
}

function focusFirstFocusable(element: HTMLElement) {
  if (element.getAttribute('tabindex') === '0') {
    element.focus()
    return
  }

  const focusable = getFocusableElements(element)
  const focusElement = focusable[0] || element
  focusElement.focus()
}

function useHandleToggleFocus(props: DialogProps, ref: Ref<HTMLElement>) {
  watch(
    () => props.visible,
    (visible) => {
      if (visible) {
        focusFirstFocusable(ref.value)
      } else {
        const disclosure: HTMLElement = document.querySelector(
          `[aria-controls="${props.baseId}"]`
        )
        disclosure.focus()
      }
    }
  )
}

export function useDialog(props: DialogProps) {
  const disclosureContent = useDisclosureContent(props)
  const { ref } = disclosureContent
  useHideOnClickOutside(props, ref)
  useHandleToggleFocus(props, ref)

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      props.hide()
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
