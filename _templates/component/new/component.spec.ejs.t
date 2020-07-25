---
to: "src/<%= name %>/<%= name %>.spec.tsx"
---
import { <%= h.capitalize(name) %> } from '.'
import { renderJsx, getByText } from '../../test/utils'

describe('<%= h.capitalize(name) %>', () => {
  it('renders correctly', async () => {
    const { nextTick } = renderJsx(
      <<%= h.capitalize(name) %>>foo</<%= h.capitalize(name) %>>
    )
    await nextTick()
    expect(getByText('foo')).toMatchInlineSnapshot()
  })
})
