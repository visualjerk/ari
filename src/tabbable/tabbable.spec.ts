import { Tabbable } from '.'
import { mount } from '@vue/test-utils'
import { markRaw, h } from 'vue'

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

  it('renders correctly when disabled', () => {
    const wrapper = mount(Tabbable, {
      props: { disabled: true },
      slots: {
        default: 'foo',
      },
    })
    expect(wrapper.html()).toMatchInlineSnapshot(
      `"<div aria-disabled=\\"true\\">foo</div>"`
    )
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
    const wrapper = mount(Tabbable, {
      props: {
        as: 'button',
      },
      slots: {
        default: 'foo',
      },
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.html()).toMatchInlineSnapshot(`"<button>foo</button>"`)
  })

  it('renders disabled native focusable elements correctly', async () => {
    const wrapper = mount(Tabbable, {
      props: {
        as: 'button',
        disabled: true,
      },
      slots: {
        default: 'foo',
      },
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.html()).toMatchInlineSnapshot(
      `"<button aria-disabled=\\"true\\" disabled=\\"\\">foo</button>"`
    )
  })

  it('renders components with native focusable element correctly', async () => {
    const testComp = markRaw({
      template: '<button><slot /></button>',
    })

    const wrapper = mount(Tabbable, {
      props: {
        as: testComp,
      },
      slots: {
        default: 'foo',
      },
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.html()).toMatchInlineSnapshot(`"<button>foo</button>"`)
  })

  it('renders components with native focusable element correctly (render function)', async () => {
    const testComp = markRaw({
      render() {
        return h('button', 'foo')
      },
    })

    const wrapper = mount(Tabbable, {
      props: {
        as: testComp,
      },
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.html()).toMatchInlineSnapshot(`"<button>foo</button>"`)
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

  it('can be focused when focusable', () => {
    const wrapper = mount(Tabbable, {
      props: { disabled: true, focusable: true },
      attachTo: document.body,
    })
    wrapper.element.focus()
    expect(wrapper.element).toEqual(document.activeElement)
  })

  it('button can be focused when focusable', () => {
    const wrapper = mount(Tabbable, {
      props: { as: 'button', disabled: true, focusable: true },
      attachTo: document.body,
    })
    wrapper.element.focus()
    expect(wrapper.element).toEqual(document.activeElement)
  })
})
