import {
  ComponentObjectPropsOptions,
  Ref,
  watch,
  onBeforeUnmount,
  inject,
} from 'vue'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import {
  defineComponent,
  getElementFromRef,
  getTabbableElements,
  isFocused,
} from '../utils'
import { useDialog, dialogProps, DialogProps } from '../Dialog'

export type ModalProps = DialogProps

export const modalProps: ComponentObjectPropsOptions<ModalProps> = {
  ...dialogProps,
}

function useFocusTrap(elementRef: Ref) {
  function handleKeydownTab(event: KeyboardEvent) {
    if (event.key !== 'Tab') {
      return
    }
    const element = getElementFromRef(elementRef)
    const tabbableElements = getTabbableElements(element)
    const firstTabbableElement = tabbableElements[0]
    const lastTabbableElement = tabbableElements[tabbableElements.length - 1]

    if (
      !event.shiftKey &&
      (isFocused(lastTabbableElement) || isFocused(element))
    ) {
      firstTabbableElement?.focus()
      event.preventDefault()
    }

    if (
      event.shiftKey &&
      (isFocused(firstTabbableElement) || isFocused(element))
    ) {
      lastTabbableElement?.focus()
      event.preventDefault()
    }
  }
  return {
    handleKeydownTab,
  }
}

function useBodyScrollLock(elementRef: Ref, props: ModalProps) {
  watch(
    () => props.visible.value,
    (visible) => {
      const element = getElementFromRef(elementRef)
      if (visible) {
        disableBodyScroll(element)
      } else {
        enableBodyScroll(element)
      }
    }
  )
  onBeforeUnmount(() => {
    const element = getElementFromRef(elementRef)
    enableBodyScroll(element)
  })
}

export function useModal(props: ModalProps) {
  const dialog = useDialog(props)

  useBodyScrollLock(dialog.ref, props)
  const { handleKeydownTab } = useFocusTrap(dialog.ref)
  function onKeydown(event: KeyboardEvent) {
    handleKeydownTab(event)
    if (!event.defaultPrevented) {
      dialog.onKeydown(event)
    }
  }
  const hasBackdrop = inject('modalBackdrop', false)

  return {
    ...dialog,
    onKeydown,
    'aria-modal': true,
    withPortal: !hasBackdrop,
  }
}

export const Modal = defineComponent(modalProps, useModal)
