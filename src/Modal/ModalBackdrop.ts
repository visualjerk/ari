import { ComponentObjectPropsOptions, computed } from 'vue'
import { defineComponent } from '../utils'
import { modalStateReturn, ModalStateReturn } from './ModalState'
import { useBox, boxProps, BoxProps } from '../Box'

export type ModalBackdropProps = BoxProps & ModalStateReturn

export const modalBackdropProps: ComponentObjectPropsOptions<ModalBackdropProps> = {
  ...boxProps,
  ...modalStateReturn,
}

export function useModalBackdrop(props: ModalBackdropProps) {
  const box = useBox()
  return {
    ...box,
    style: computed(() => (props.visible.value ? null : 'display: none;')),
  }
}

export const ModalBackdrop = defineComponent(
  modalBackdropProps,
  useModalBackdrop,
  true
)
