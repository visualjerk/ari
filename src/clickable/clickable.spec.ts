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
})
