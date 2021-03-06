import { ref } from 'vue'
import { Disclosure } from '..'
import { renderJsx, getByText } from '../../../test/utils'

describe('Disclosure', () => {
  it('renders correctly', async () => {
    const { nextTick } = renderJsx(
      <Disclosure visible={ref(false)} baseId="id">
        foo
      </Disclosure>
    )
    await nextTick()
    expect(getByText('foo')).toMatchInlineSnapshot(`
      <button
        aria-controls="id"
        aria-expanded="false"
        type="button"
      >
        foo
      </button>
    `)
  })

  it('renders visible state correctly', async () => {
    const { nextTick } = renderJsx(
      <Disclosure visible={ref(true)} baseId="id">
        foo
      </Disclosure>
    )
    await nextTick()
    expect(getByText('foo')).toMatchInlineSnapshot(`
      <button
        aria-controls="id"
        aria-expanded="true"
        type="button"
      >
        foo
      </button>
    `)
  })
})
