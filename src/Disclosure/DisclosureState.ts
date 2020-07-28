import { ComponentObjectPropsOptions, ref, Ref, PropType } from 'vue'

let currentIdCount = 0

export interface DisclosureStateReturn {
  baseId: string
  visible: Ref<boolean>
  show: () => void
  hide: () => void
  toggle: () => void
}

export const disclosureStateReturn: ComponentObjectPropsOptions<DisclosureStateReturn> = {
  baseId: {
    type: String,
    required: true,
  },
  visible: {
    required: true,
  },
  show: {
    type: Function as PropType<() => void>,
  },
  hide: {
    type: Function as PropType<() => void>,
  },
  toggle: {
    type: Function as PropType<() => void>,
  },
}

export function useDisclosureState(): DisclosureStateReturn {
  const baseId = `disclosure-${currentIdCount++}`
  const visible = ref(false)

  function show() {
    visible.value = true
  }

  function hide() {
    visible.value = false
  }

  function toggle() {
    visible.value = !visible.value
  }

  return {
    baseId,
    visible,
    show,
    hide,
    toggle,
  }
}
