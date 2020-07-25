import { DisclosureContent } from '.'
import { renderJsx, getByText } from '../../test/utils'

describe('DisclosureContent', () => {
  it('renders correctly', async () => {
    const { nextTick } = renderJsx(
      <DisclosureContent baseId="id" visible={false}>
        foo
      </DisclosureContent>
    )
    await nextTick()
    expect(getByText('foo')).toMatchInlineSnapshot(`
      <div
        hidden=""
        id="id"
        style="display: none;"
      >
        foo
      </div>
    `)
  })

  it('renders visible state correctly', async () => {
    const { nextTick } = renderJsx(
      <DisclosureContent baseId="id" visible={true}>
        foo
      </DisclosureContent>
    )
    await nextTick()
    expect(getByText('foo')).toMatchInlineSnapshot(`
      <div
        id="id"
      >
        foo
      </div>
    `)
  })
})
