import { useCompositeState } from '..'

describe('useCompositeState', () => {
  it('has correct base id', () => {
    const { baseId } = useCompositeState()
    expect(baseId).toBe('composite-0')
  })

  it('item 0 is selected by default', () => {
    const { selectedItem } = useCompositeState()
    expect(selectedItem.value).toBe(0)
  })
})
