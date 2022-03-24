import { ref } from 'vue'
import { ModalBackdrop } from '..'
import { renderJsx, getByText } from '../../../test/utils'

describe('ModalBackdrop', () => {
  it('renders correctly', async () => {
    const { nextTick } = renderJsx(
      <ModalBackdrop baseId="id" visible={ref(false)}>
        foo
      </ModalBackdrop>
    )
    await nextTick()
    expect(getByText('foo')).toMatchInlineSnapshot(`
      <div
        hidden=""
        style="display: none;"
      >
        foo
      </div>
    `)
  })

  it('renders correctly when visible', async () => {
    const { nextTick } = renderJsx(
      <ModalBackdrop baseId="id" visible={ref(true)}>
        foo
      </ModalBackdrop>
    )
    await nextTick()
    expect(getByText('foo')).toMatchInlineSnapshot(`
      <div>
        foo
      </div>
    `)
  })

  it('renders in portal', async () => {
    const { nextTick } = renderJsx(
      <div>
        container
        <ModalBackdrop baseId="id" visible={ref(false)}>
          foo
        </ModalBackdrop>
      </div>
    )
    await nextTick()
    expect(getByText('foo').parentElement).not.toBe(getByText('container'))
  })
})
