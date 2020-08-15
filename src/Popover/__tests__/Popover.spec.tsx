import { Popover } from '..'
import { renderJsx, getByText } from '../../../test/utils'

describe('Popover', () => {
  it('renders correctly', async () => {
    const { nextTick } = renderJsx(
      <Popover baseId="id" visible={false}>
        foo
      </Popover>
    )
    await nextTick()
    expect(getByText('foo')).toMatchInlineSnapshot(`
      <div
        hidden=""
        id="id"
        role="dialog"
        style="display: none;"
        tabindex="-1"
      >
        foo
      </div>
    `)
  })
})
