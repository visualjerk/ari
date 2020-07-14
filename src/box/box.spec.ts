import { Box } from './box'
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
})
