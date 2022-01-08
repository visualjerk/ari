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
  const baseId = `composite-${count++}`
  const selectedItem: Ref<number | null> = ref(null)
  const containerEl = ref(null)
  const items = ref(new Map())
  let nextId = 0

  function getCurrentItem() {
    if (selectedItem.value == null) {
      return null
    }
    return items.value.get(selectedItem.value)
  }

  function registerItem(item) {
    const itemId = nextId++
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
    containerEl.value?.value.focus()
  }

  function keyboard(event: KeyboardEvent) {
    const currentItem = getCurrentItem()
    currentItem.onKeydown(event)
    currentItem.onKeyup(event)
  }

  function getIdByEl(el) {
    const itemId = el.id
    return Number(itemId.replace(`${baseId}-`, ''))
  }

  function move(itemId: number) {
    if (items.value.get(itemId) !== null) {
      selectedItem.value = itemId
    }
  }

  function sortedByDomPosition(a, b) {
    if (
      a.ref.compareDocumentPosition(b.ref) & a.ref.DOCUMENT_POSITION_PRECEDING
    ) {
      return 1
    }
    if (
      a.ref.compareDocumentPosition(b.ref) & a.ref.DOCUMENT_POSITION_FOLLOWING
    ) {
      return -1
    }
    return 0
  }

  function getItemsSortedByDomPosition() {
    return Array.from(items.value.values()).sort(sortedByDomPosition)
  }

  function getNextItemByDomPosition(item) {
    const sortedItems = getItemsSortedByDomPosition()
    const itemIndex = sortedItems.indexOf(item)
    return sortedItems[itemIndex + 1]
      ? sortedItems[itemIndex + 1]
      : sortedItems[0]
  }

  function getPreviousItemByDomPosition(item) {
    const sortedItems = getItemsSortedByDomPosition()
    const itemIndex = sortedItems.indexOf(item)
    return sortedItems[itemIndex - 1]
      ? sortedItems[itemIndex - 1]
      : sortedItems[sortedItems.length - 1]
  }

  function next() {
    const currentItem = getCurrentItem()
    if (!currentItem) {
      return
    }
    const nextItem = getNextItemByDomPosition(currentItem)
    if (!nextItem) {
      return
    }
    const nextId = getIdByEl(nextItem.ref)
    move(nextId)
    if (selectedItemIsNotSelectable()) {
      next()
    }
  }

  function previous() {
    const currentItem = getCurrentItem()
    if (!currentItem) {
      return
    }
    const previousItem = getPreviousItemByDomPosition(currentItem)
    if (!previousItem) {
      return
    }
    const previousId = getIdByEl(previousItem.ref)
    move(previousId)
    if (selectedItemIsNotSelectable()) {
      previous()
    }
  }

  function selectedItemIsNotSelectable() {
    const item = getCurrentItem()
    if (!item) {
      return true
    }
    return item['aria-disabled']
  }

  return {
    baseId,
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
