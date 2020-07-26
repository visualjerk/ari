import { DialogDisclosure } from '.'
import { renderJsx, getByText } from '../../test/utils'

describe('DialogDisclosure', () => {
  it('renders correctly', async () => {
    const { nextTick } = renderJsx(
      <DialogDisclosure baseId="id" visible={false}>
        foo
      </DialogDisclosure>
    )
    await nextTick()
    expect(getByText('foo')).toMatchInlineSnapshot(`
    <button
      aria-controls="id"
      aria-expanded="false"
      aria-haspopup="dialog"
      type="button"
    >
      foo
    </button>
    `)
  })
})
