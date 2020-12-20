import { useCompositeState } from '..'

describe('useCompositeState', () => {
  it('has correct base id', () => {
    const { baseId } = useCompositeState()
    expect(baseId).toBe('composite-0')
  })

  it('has unique base ids', () => {
    const { baseId } = useCompositeState()
    const { baseId: baseId2 } = useCompositeState()
    expect(baseId).not.toEqual(baseId2)
  })

  it('no item is selected by default', () => {
    const { selectedItem } = useCompositeState()
    expect(selectedItem.value).toBe(null)
  })

  it('returns unique id for registered item', () => {
    const { registerItem } = useCompositeState()
    const id = registerItem({})
    const id2 = registerItem({})
    expect(id).toBe(0)
    expect(id2).toBe(1)
  })

  it('first item is selected if items are registered', () => {
    const { selectedItem, registerItem } = useCompositeState()
    registerItem({})
    expect(selectedItem.value).toBe(0)
  })

  it('move selects specified index', () => {
    const { selectedItem, registerItem, move } = useCompositeState()
    registerItem({})
    registerItem({})
    move(1)
    expect(selectedItem.value).toBe(1)
  })

  it('registering items does not reset selected item', () => {
    const { selectedItem, registerItem, move } = useCompositeState()
    registerItem({})
    registerItem({})
    move(1)
    expect(selectedItem.value).toBe(1)
    registerItem({})
    expect(selectedItem.value).toBe(1)
  })

  it('move to higher number wraps around to first index', () => {
    const { selectedItem, registerItem, move } = useCompositeState()
    registerItem({})
    registerItem({})
    move(4)
    expect(selectedItem.value).toBe(0)
  })

  it('move to negative number wraps around to last index', () => {
    const { selectedItem, registerItem, move } = useCompositeState()
    registerItem({})
    registerItem({})
    move(-1)
    expect(selectedItem.value).toBe(1)
  })

  it('next selects next item', () => {
    const { selectedItem, registerItem, next } = useCompositeState()
    registerItem({})
    registerItem({})
    registerItem({})
    next()
    expect(selectedItem.value).toBe(1)
    next()
    expect(selectedItem.value).toBe(2)
    next()
    expect(selectedItem.value).toBe(0)
  })

  it('previous selects previous item', () => {
    const { selectedItem, registerItem, previous } = useCompositeState()
    registerItem({})
    registerItem({})
    registerItem({})
    previous()
    expect(selectedItem.value).toBe(2)
    previous()
    expect(selectedItem.value).toBe(1)
    previous()
    expect(selectedItem.value).toBe(0)
  })
})
