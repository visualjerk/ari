import { ComponentObjectPropsOptions, ref, Ref, PropType } from 'vue'

export interface CompositeStateReturn {
  baseId: string
  selectedItem: Ref<number | null>
  registerItem: (item) => number
  unregisterItem: (itemId: number) => void
  registerContainer: (item: Ref<HTMLElement>) => void
  focus: () => void
  keyboard: (event: KeyboardEvent) => void
  move: (index: number) => void
  next: () => void
  previous: () => void
}

export const compositeStateReturn: ComponentObjectPropsOptions<CompositeStateReturn> = {
  baseId: {
    type: String,
    required: true,
  },
  selectedItem: {
    required: true,
  },
  registerItem: {
    type: Function as PropType<() => number>,
  },
  unregisterItem: {
    type: Function as PropType<() => void>,
  },
  registerContainer: {
    type: Function as PropType<() => void>,
  },
  focus: {
    type: Function as PropType<() => void>,
  },
  keyboard: {
    type: Function as PropType<() => void>,
  },
  move: {
    type: Function as PropType<() => void>,
  },
  next: {
    type: Function as PropType<() => void>,
  },
  previous: {
    type: Function as PropType<() => void>,
  },
}

let count = 0

export function useCompositeState(): CompositeStateReturn {
  const selectedItem: Ref<null | number> = ref(null)
  const containerEl = ref(null)
  const items = ref(new Map())

  function registerItem(item) {
    const itemId = items.value.size
    items.value.set(itemId, item)

    if (selectedItem.value == null) {
      selectedItem.value = itemId
      if (selectedItemIsNotSelectable()) {
        selectedItem.value = null
      }
    }
    return itemId
  }

  function unregisterItem(itemId) {
    items.value.delete(itemId)
  }

  function registerContainer(element) {
    containerEl.value = element
  }

  function focus() {
    containerEl.value.value.focus()
  }

  function keyboard(event: KeyboardEvent) {
    const currentItem = items.value.get(selectedItem.value)
    currentItem.onKeydown(event)
    currentItem.onKeyup(event)
  }

  function move(index: number) {
    const keys = Array.from(items.value.keys())
    const firstKey = keys[0]
    const lastKey = keys[keys.length - 1]
    if (index < firstKey) {
      selectedItem.value = lastKey
      return
    }
    if (index > lastKey) {
      selectedItem.value = firstKey
      return
    }
    selectedItem.value = index
  }

  function next() {
    if (selectedItem.value == null) {
      return
    }
    move(selectedItem.value + 1)
    if (selectedItemIsNotSelectable()) {
      next()
    }
  }

  function previous() {
    if (selectedItem.value == null) {
      return
    }
    move(selectedItem.value - 1)
    if (selectedItemIsNotSelectable()) {
      previous()
    }
  }

  function selectedItemIsNotSelectable() {
    const item = items.value.get(selectedItem.value)
    if (!item) {
      return true
    }
    return item['aria-disabled']
  }

  return {
    baseId: `composite-${count++}`,
    selectedItem,
    registerItem,
    unregisterItem,
    registerContainer,
    focus,
    keyboard,
    move,
    next,
    previous,
  }
}
