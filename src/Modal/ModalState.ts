import { ComponentObjectPropsOptions } from 'vue'
import { DialogStateReturn, dialogStateReturn, useDialogState } from '../Dialog'

export type ModalStateReturn = DialogStateReturn

export const modalStateReturn: ComponentObjectPropsOptions<ModalStateReturn> = {
  ...dialogStateReturn,
}

export function useModalState(): ModalStateReturn {
  const dialog = useDialogState()

  return {
    ...dialog,
  }
}
