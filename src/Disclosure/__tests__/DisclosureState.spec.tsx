import { useDisclosureState } from '..'

describe('DisclosureContent', () => {
  it('has correct base id', () => {
    const { baseId } = useDisclosureState()
    expect(baseId).toBe('disclosure-0')
  })

  it('is hidden by default', () => {
    const { visible } = useDisclosureState()
    expect(visible.value).toBe(false)
  })

  it('has unique base ids', () => {
    const { baseId } = useDisclosureState()
    const { baseId: baseId2 } = useDisclosureState()
    expect(baseId).not.toBe(baseId2)
  })

  it('can show', () => {
    const { visible, show } = useDisclosureState()
    show()
    expect(visible.value).toBe(true)
  })

  it('can hide', () => {
    const { visible, show, hide } = useDisclosureState()
    show()
    hide()
    expect(visible.value).toBe(false)
  })

  it('can toggle', () => {
    const { visible, toggle } = useDisclosureState()
    toggle()
    expect(visible.value).toBe(true)
    toggle()
    expect(visible.value).toBe(false)
  })
})
