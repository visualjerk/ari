import { ComponentObjectPropsOptions } from 'vue'
import { DialogStateReturn, dialogStateReturn, useDialogState } from '../Dialog'

export type PopoverStateReturn = DialogStateReturn

export const popoverStateReturn: ComponentObjectPropsOptions<PopoverStateReturn> = {
  ...dialogStateReturn,
}

export function usePopoverState(): PopoverStateReturn {
  const dialog = useDialogState()

  return {
    ...dialog,
  }
}
