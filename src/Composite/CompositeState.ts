import { ComponentObjectPropsOptions, ref, Ref, PropType } from 'vue'

export interface CompositeStateReturn {
  baseId: string
  selectedItem: Ref<number | null>
  registerItem: (item) => number
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
      if (selectedItemIsDisabled()) {
        selectedItem.value = null
      }
    }
    return itemId
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
    if (index < 0) {
      selectedItem.value = items.value.size - 1
    } else {
      selectedItem.value = index % items.value.size
    }
  }

  function next() {
    if (selectedItem.value == null) {
      return
    }
    move(selectedItem.value + 1)
    if (selectedItemIsDisabled()) {
      next()
    }
  }

  function previous() {
    if (selectedItem.value == null) {
      return
    }
    move(selectedItem.value - 1)
    if (selectedItemIsDisabled()) {
      previous()
    }
  }

  function selectedItemIsDisabled() {
    const item = items.value.get(selectedItem.value)
    if (!item) {
      return
    }
    return item['aria-disabled']
  }

  return {
    baseId: `composite-${count++}`,
    selectedItem,
    registerItem,
    registerContainer,
    focus,
    keyboard,
    move,
    next,
    previous,
  }
}
