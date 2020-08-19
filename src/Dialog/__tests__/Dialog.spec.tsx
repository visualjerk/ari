import { ref } from 'vue'
import { Dialog } from '..'
import { renderJsx, getByText } from '../../../test/utils'

describe('Dialog', () => {
  it('renders correctly', async () => {
    const { nextTick } = renderJsx(
      <Dialog baseId="id" visible={ref(false)}>
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

  it('renders in portal', async () => {
    const { nextTick } = renderJsx(
      <div>
        container
        <Dialog baseId="id" visible={ref(false)}>
          foo
        </Dialog>
      </div>
    )
    await nextTick()
    expect(getByText('foo').parentElement).not.toBe(getByText('container'))
  })

  it('renders native attributes', async () => {
    const { nextTick } = renderJsx(
      <Dialog baseId="id" visible={ref(false)} aria-label="bar">
        foo
      </Dialog>
    )
    await nextTick()
    expect(getByText('foo')).toHaveAttribute('aria-label', 'bar')
  })

  it('does not warn when receiving native attributes', async () => {
    const warn = console.warn
    console.warn = jest.fn()
    renderJsx(
      <Dialog baseId="id" visible={ref(false)} aria-label="bar">
        foo
      </Dialog>
    )
    expect(console.warn).toHaveBeenCalledTimes(0)
    console.warn = warn
  })

  it('can overwrite default tabindex', async () => {
    const { nextTick } = renderJsx(
      <Dialog baseId="id" visible={ref(false)} tabindex="0">
        foo
      </Dialog>
    )
    await nextTick()
    expect(getByText('foo')).toHaveAttribute('tabindex', '0')
  })
})
