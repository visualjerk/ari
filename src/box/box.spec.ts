import { Box } from '.'
import { mount } from '@vue/test-utils'

describe('Box', () => {
  it('renders correctly', () => {
    const wrapper = mount(Box, {
      slots: {
        default: 'foo',
      },
    })
    expect(wrapper.html()).toMatchInlineSnapshot(`"<div>foo</div>"`)
  })

  it('renders passed attributes', () => {
    const wrapper = mount(Box, {
      attrs: {
        tabIndex: 0,
        class: 'bar',
        unicorn: true,
      },
      slots: {
        default: 'foo',
      },
    })
    expect(wrapper.html()).toMatchInlineSnapshot(
      `"<div tabindex=\\"0\\" class=\\"bar\\" unicorn=\\"true\\">foo</div>"`
    )
  })

  it('can render as other element types', () => {
    const wrapper = mount(Box, {
      props: {
        as: 'span',
      },
      slots: {
        default: 'foo',
      },
    })
    expect(wrapper.html()).toMatchInlineSnapshot(`"<span>foo</span>"`)
  })
})
