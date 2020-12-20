import { ComponentObjectPropsOptions, ref, Ref, PropType } from 'vue'

export interface CompositeStateReturn {
  baseId: string
  selectedItem: Ref<number>
  registerItem: (item: Ref<HTMLElement>) => number
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
  const selectedItem = ref(null)
  const items = ref(new Map())
  
  function registerItem(item) {
    const itemId = items.value.size
    items.value.set(itemId, item)

    if (selectedItem.value == null) {
      selectedItem.value = 0
    }
    return itemId
  }

  function move(index) {
    if (index < 0) {
      selectedItem.value = items.value.size - 1
    } else {
      selectedItem.value = index % items.value.size
    }
  }

  function next() {
    move(selectedItem.value + 1)
  }

  function previous() {
    move(selectedItem.value - 1)
  }

  return {
    baseId: `composite-${count++}`,
    selectedItem,
    registerItem,
    move,
    next,
    previous,
  }
}
