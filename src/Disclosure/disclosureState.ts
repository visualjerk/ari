import { ComponentObjectPropsOptions, ref, Ref } from 'vue'

let currentIdCount = 0

export interface DisclosureStateReturn {
  baseId: string
  visible: Ref<boolean>
  show: Function
  hide: Function
  toggle: Function
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
    type: Function,
  },
  hide: {
    type: Function,
  },
  toggle: {
    type: Function,
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
