import { ComponentObjectPropsOptions } from 'vue'
import {
  DisclosureStateReturn,
  disclosureStateReturn,
  useDisclosureState,
} from '../Disclosure'

export type DialogStateReturn = DisclosureStateReturn

export const dialogStateReturn: ComponentObjectPropsOptions<DialogStateReturn> = {
  ...disclosureStateReturn,
}

export function useDialogState(): DialogStateReturn {
  const disclosure = useDisclosureState()

  return {
    ...disclosure,
  }
}
