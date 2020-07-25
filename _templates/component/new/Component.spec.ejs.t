---
to: "src/<%= name %>/<%= name %>.spec.tsx"
---
import { <%= name %> } from '.'
import { renderJsx, getByText } from '../../test/utils'

describe('<%= name %>', () => {
  it('renders correctly', async () => {
    const { nextTick } = renderJsx(
      <<%= name %>>foo</<%= name %>>
    )
    await nextTick()
    expect(getByText('foo')).toMatchInlineSnapshot()
  })
})
