import { Box } from '.'
import { renderJsx, getByText } from '../../test/utils'

describe('Box', () => {
  it('renders correctly', () => {
    renderJsx(<Box>foo</Box>)
    expect(getByText('foo')).toMatchInlineSnapshot(`
      <div>
        foo
      </div>
    `)
  })

  it('renders passed attributes', () => {
    renderJsx(
      <Box tabIndex="0" class="bar" unicorn>
        foo
      </Box>
    )
    expect(getByText('foo')).toMatchInlineSnapshot(`
      <div
        class="bar"
        tabindex="0"
        unicorn="true"
      >
        foo
      </div>
    `)
  })

  it('can render as other element types', () => {
    renderJsx(<Box as="span">foo</Box>)
    expect(getByText('foo')).toMatchInlineSnapshot(`
      <span>
        foo
      </span>
    `)
  })
})
