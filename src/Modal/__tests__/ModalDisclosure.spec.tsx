import { ref } from 'vue'
import { ModalDisclosure } from '..'
import { renderJsx, getByText } from '../../../test/utils'

describe('ModalDisclosure', () => {
  it('renders correctly', async () => {
    const { nextTick } = renderJsx(
      <ModalDisclosure baseId="id" visible={ref(false)}>
        foo
      </ModalDisclosure>
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
