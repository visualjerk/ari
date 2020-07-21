import { Tabbable } from '.'
import { mount } from '@vue/test-utils'
import { markRaw, h } from 'vue'
import {
  render,
  renderJsx,
  getByText,
  click,
  mousedown,
  mouseover,
} from '../../test/utils'

describe('Tabbable', () => {
  it('renders correctly', () => {
    renderJsx(<Tabbable>foo</Tabbable>)
    expect(getByText('foo')).toMatchInlineSnapshot(`
      <div
        tabindex="0"
      >
        foo
      </div>
    `)
  })

  it('can render as other element', () => {
    renderJsx(<Tabbable as="span">foo</Tabbable>)
    expect(getByText('foo')).toMatchInlineSnapshot(`
      <span
        tabindex="0"
      >
        foo
      </span>
    `)
  })

  it('renders correctly when disabled', () => {
    renderJsx(<Tabbable disabled>foo</Tabbable>)
    expect(getByText('foo')).toMatchInlineSnapshot(`
      <div
        aria-disabled="true"
      >
        foo
      </div>
    `)
  })

  it('disabled is reactive', async () => {
    const wrapper = mount(Tabbable, {
      props: { disabled: false },
      slots: {
        default: 'foo',
      },
    })
    await wrapper.setProps({ disabled: true })
    expect(wrapper.attributes('aria-disabled')).toEqual('true')
  })

  it('renders native focusable elements correctly', async () => {
    const { nextTick } = renderJsx(<Tabbable as="button">foo</Tabbable>)
    await nextTick()
    expect(getByText('foo')).toMatchInlineSnapshot(`
      <button>
        foo
      </button>
    `)
  })

  it('renders disabled native focusable elements correctly', async () => {
    const { nextTick } = renderJsx(
      <Tabbable as="button" disabled>
        foo
      </Tabbable>
    )
    await nextTick()
    expect(getByText('foo')).toMatchInlineSnapshot(`
      <button
        aria-disabled="true"
        disabled=""
      >
        foo
      </button>
    `)
  })

  it('renders components with native focusable element correctly', async () => {
    const testComp = markRaw({
      template: '<button>foo</button>',
    })
    const { nextTick } = render(Tabbable, {
      props: {
        as: testComp,
      },
    })
    await nextTick()
    expect(getByText('foo')).toMatchInlineSnapshot(`
      <button>
        foo
      </button>
    `)
  })

  it('renders components with native focusable element correctly (render function)', async () => {
    const testComp = markRaw({
      render() {
        return h('button', 'foo')
      },
    })
    const { nextTick } = render(Tabbable, {
      props: {
        as: testComp,
      },
    })
    await nextTick()
    expect(getByText('foo')).toMatchInlineSnapshot(`
      <button>
        foo
      </button>
    `)
  })

  it('can be focused', () => {
    renderJsx(<Tabbable>foo</Tabbable>)
    const tabbable = getByText('foo')
    tabbable.focus()
    expect(tabbable).toEqual(document.activeElement)
  })

  it('cannot be focused when disabled', () => {
    renderJsx(<Tabbable disabled>foo</Tabbable>)
    const tabbable = getByText('foo')
    tabbable.focus()
    expect(tabbable).not.toEqual(document.activeElement)
  })

  it('can be focused when focusable', () => {
    renderJsx(
      <Tabbable disabled focusable>
        foo
      </Tabbable>
    )
    const tabbable = getByText('foo')
    tabbable.focus()
    expect(tabbable).toEqual(document.activeElement)
  })

  it('button can be focused when focusable', () => {
    renderJsx(
      <Tabbable as="button" disabled focusable>
        foo
      </Tabbable>
    )
    const tabbable = getByText('foo')
    tabbable.focus()
    expect(tabbable).toEqual(document.activeElement)
  })

  it('emits click event', () => {
    const clickHandler = jest.fn()
    renderJsx(<Tabbable onClick={clickHandler}>foo</Tabbable>)
    click(getByText('foo'))
    expect(clickHandler).toBeCalledTimes(1)
  })

  it('emits no click event when disabled', () => {
    const clickHandler = jest.fn()
    renderJsx(
      <Tabbable onClick={clickHandler} disabled>
        foo
      </Tabbable>
    )
    click(getByText('foo'))
    expect(clickHandler).toBeCalledTimes(0)
  })

  it('emits mousedown event', () => {
    const mousedownHandler = jest.fn()
    renderJsx(<Tabbable onMousedown={mousedownHandler}>foo</Tabbable>)
    mousedown(getByText('foo'))
    expect(mousedownHandler).toBeCalledTimes(1)
  })

  it('emits no mousedown event when disabled', () => {
    const mousedownHandler = jest.fn()
    renderJsx(
      <Tabbable onMousedown={mousedownHandler} disabled>
        foo
      </Tabbable>
    )
    mousedown(getByText('foo'))
    expect(mousedownHandler).toBeCalledTimes(0)
  })

  it('emits mouseover event', () => {
    const mouseoverHandler = jest.fn()
    renderJsx(<Tabbable onMouseover={mouseoverHandler}>foo</Tabbable>)
    mouseover(getByText('foo'))
    expect(mouseoverHandler).toBeCalledTimes(1)
  })

  it('emits no mouseover event when disabled', () => {
    const mouseoverHandler = jest.fn()
    renderJsx(
      <Tabbable onMouseover={mouseoverHandler} disabled>
        foo
      </Tabbable>
    )
    mouseover(getByText('foo'))
    expect(mouseoverHandler).toBeCalledTimes(0)
  })
})
