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
        aria-modal="true"
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

  it('renders in portal', async () => {
    const { nextTick } = renderJsx(
      <div>
        container
        <Modal baseId="id" visible={ref(false)}>
          foo
        </Modal>
      </div>
    )
    await nextTick()
    expect(getByText('foo').parentElement).not.toBe(getByText('container'))
  })
})
