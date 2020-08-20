import { ref } from 'vue'
import { Modal } from '..'
import { renderJsx, getByText } from '../../../test/utils'

describe('Modal', () => {
  it('renders correctly', async () => {
    const { nextTick } = renderJsx(
      <Modal baseId="id" visible={ref(false)}>
        foo
      </Modal>
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
