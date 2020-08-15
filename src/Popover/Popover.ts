import { ComponentObjectPropsOptions, watch } from 'vue'
import { createPopper } from '@popperjs/core'
import { defineComponent } from '../utils'
import { useDialog, dialogProps, DialogProps } from '../Dialog'

export type PopoverProps = DialogProps

export const popoverProps: ComponentObjectPropsOptions<PopoverProps> = {
  ...dialogProps,
}

export function usePopover(props: PopoverProps) {
  const popover = useDialog(props)
  const { baseId } = props
  const { ref } = popover

  let popper
  watch(
    () => props.visible,
    (visible) => {
      const disclosureElement = document.querySelector(
        `[aria-controls="${baseId}"]`
      )
      const popoverElement = ref.value

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
    ...popover,
  }
}

export const Popover = defineComponent(popoverProps, usePopover)
