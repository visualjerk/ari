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

  it('emits click event on keydown space', () => {
    const clickHandler = jest.fn()
    const wrapper = mount(Clickable, {
      props: {
        onClick: clickHandler,
      },
    })
    wrapper.trigger('keydown', { key: 'space' })
    expect(clickHandler).toBeCalledTimes(1)
  })

  it('emits no click event on keydown space when disabled', () => {
    const clickHandler = jest.fn()
    const wrapper = mount(Clickable, {
      props: {
        onClick: clickHandler,
        disabled: true,
      },
    })
    wrapper.trigger('keydown', { key: 'space' })
    expect(clickHandler).toBeCalledTimes(0)
  })

  it('emits click event on keydown enter', () => {
    const clickHandler = jest.fn()
    const wrapper = mount(Clickable, {
      props: {
        onClick: clickHandler,
      },
    })
    wrapper.trigger('keydown', { key: 'enter' })
    expect(clickHandler).toBeCalledTimes(1)
  })

  it('emits no click event on keydown enter when disabled', () => {
    const clickHandler = jest.fn()
    const wrapper = mount(Clickable, {
      props: {
        onClick: clickHandler,
        disabled: true,
      },
    })
    wrapper.trigger('keydown', { key: 'enter' })
    expect(clickHandler).toBeCalledTimes(0)
  })

  it('emits only one click event on keydown space as button', () => {
    // TODO: False positive
    const clickHandler = jest.fn()
    const wrapper = mount(Clickable, {
      props: {
        onClick: clickHandler,
        as: 'button',
      },
    })
    wrapper.trigger('keydown', { key: 'space' })
    expect(clickHandler).toBeCalledTimes(1)
  })
})
