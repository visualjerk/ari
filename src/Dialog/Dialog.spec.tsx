import { Dialog } from '.'
import { renderJsx, getByText } from '../../test/utils'

describe('Dialog', () => {
  it('renders correctly', async () => {
    const { nextTick } = renderJsx(
      <Dialog baseId="id" visible={false}>
        foo
      </Dialog>
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

  it('should be rendered in portal', async () => {
    const { nextTick } = renderJsx(
      <div>
        container
        <Dialog baseId="id" visible={false}>
          foo
        </Dialog>
      </div>
    )
    await nextTick()
    expect(getByText('foo').parentElement).not.toBe(getByText('container'))
  })
})
