import { ComponentObjectPropsOptions, watch } from 'vue'
import { createPopper } from '@popperjs/core'
import { defineComponent, getElementFromRef } from '../utils'
import { useDialog, dialogProps, DialogProps } from '../Dialog'

export type PopoverProps = DialogProps

export const popoverProps: ComponentObjectPropsOptions<PopoverProps> = {
  ...dialogProps,
}

export function usePopover(props: PopoverProps) {
  const dialog = useDialog(props)
  const { baseId } = props
  const { ref } = dialog

  let popper
  watch(
    () => props.visible.value,
    (visible) => {
      const disclosureElement = document.querySelector(
        `[aria-controls="${baseId}"]`
      )
      const popoverElement = getElementFromRef(ref)

      if (visible) {
        popper = createPopper(disclosureElement, popoverElement, {
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, 4],
              },
            },
          ],
        })
      } else {
        popper.destroy()
      }
    }
  )

  return {
    ...dialog,
  }
}

export const Popover = defineComponent(popoverProps, usePopover, true)
