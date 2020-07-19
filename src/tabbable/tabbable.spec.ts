import { Tabbable } from '.'
import { mount } from '@vue/test-utils'

describe('Tabbable', () => {
  it('renders correctly', () => {
    const wrapper = mount(Tabbable, {
      slots: {
        default: 'foo',
      },
    })
    expect(wrapper.html()).toMatchInlineSnapshot(
      `"<div tabindex=\\"0\\">foo</div>"`
    )
  })

  it('can render as other element', () => {
    const wrapper = mount(Tabbable, {
      props: {
        as: 'span',
      },
      slots: {
        default: 'foo',
      },
    })
    expect(wrapper.html()).toMatchInlineSnapshot(
      `"<span tabindex=\\"0\\">foo</span>"`
    )
  })

  it('can be focused', () => {
    const wrapper = mount(Tabbable, { attachTo: document.body })
    wrapper.element.focus()
    expect(wrapper.element).toEqual(document.activeElement)
    wrapper.unmount()
  })

  it('cannot be focused when disabled', () => {
    const wrapper = mount(Tabbable, {
      props: { disabled: true },
      attachTo: document.body,
    })
    wrapper.element.focus()
    expect(wrapper.element).not.toEqual(document.activeElement)
  })
})
