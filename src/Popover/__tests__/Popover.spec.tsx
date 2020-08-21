import { ref } from 'vue'
import { Popover } from '..'
import { renderJsx, getByText } from '../../../test/utils'

describe('Popover', () => {
  it('renders correctly', async () => {
    const { nextTick } = renderJsx(
      <Popover baseId="id" visible={ref(false)}>
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

  it('renders in portal', async () => {
    const { nextTick } = renderJsx(
      <div>
        container
        <Popover baseId="id" visible={ref(false)}>
          foo
        </Popover>
      </div>
    )
    await nextTick()
    expect(getByText('foo').parentElement).not.toBe(getByText('container'))
  })
})
