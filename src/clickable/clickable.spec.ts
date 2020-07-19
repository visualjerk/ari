import { Clickable } from '.'
import { mount } from '@vue/test-utils'

describe('Clickable', () => {
  it('renders correctly', () => {
    const wrapper = mount(Clickable, {
      slots: {
        default: 'foo',
      },
    })
    expect(wrapper.html()).toMatchInlineSnapshot(
      `"<div tabindex=\\"0\\">foo</div>"`
    )
  })

  it('emits click event', () => {
    const clickHandler = jest.fn()
    const wrapper = mount(Clickable, {
      props: {
        onClick: clickHandler,
      },
      slots: {
        default: 'foo',
      },
    })
    wrapper.trigger('click')
    expect(clickHandler).toBeCalledTimes(1)
  })

  it('emits no click event when disabled', () => {
    const clickHandler = jest.fn()
    const wrapper = mount(Clickable, {
      props: {
        onClick: clickHandler,
        disabled: true,
      },
      slots: {
        default: 'foo',
      },
    })
    wrapper.trigger('click')
    expect(clickHandler).toHaveBeenCalledTimes(0)
  })
})
