import { ComponentObjectPropsOptions, provide } from 'vue'
import { defineComponent, useVisibilityTransition } from '../utils'
import { modalStateReturn, ModalStateReturn } from './ModalState'
import { useBox, boxProps, BoxProps } from '../Box'

export type ModalBackdropProps = BoxProps & ModalStateReturn

export const modalBackdropProps: ComponentObjectPropsOptions<ModalBackdropProps> =
  {
    ...boxProps,
    ...modalStateReturn,
  }

export function useModalBackdrop(props: ModalBackdropProps) {
  const box = useBox()
  provide('modalBackdrop', true)
  useVisibilityTransition(props.visible, box.ref)

  return {
    ...box,
    withPortal: true,
    visible: props.visible,
  }
}

export const ModalBackdrop = defineComponent(
  modalBackdropProps,
  useModalBackdrop
)
