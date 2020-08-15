import { PopoverDisclosure } from '..'
import { renderJsx, getByText } from '../../../test/utils'

describe('PopoverDisclosure', () => {
  it('renders correctly', async () => {
    const { nextTick } = renderJsx(
      <PopoverDisclosure baseId="id" visible={false}>
        foo
      </PopoverDisclosure>
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
