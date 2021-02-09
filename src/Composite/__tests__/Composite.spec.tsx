import { ref } from 'vue'
import { Composite } from '..'
import { renderJsx, getByText } from '../../../test/utils'

describe('Composite', () => {
  it('renders correctly', async () => {
    const { nextTick } = renderJsx(
      <Composite baseId="id" selectedItem={ref(0)} registerContainer={() => null}>
        foo
      </Composite>
    )
    await nextTick()
    expect(getByText('foo')).toMatchInlineSnapshot(`
      <div
        aria-activedescendant="id-0"
        tabindex="0"
      >
        foo
      </div>
    `)
  })

  it('shows correct active descendant', async () => {
    const { nextTick } = renderJsx(
      <Composite baseId="bar" selectedItem={ref(1)} registerContainer={() => null}>
        foo
      </Composite>
    )
    await nextTick()
    expect(getByText('foo')).toHaveAttribute('aria-activedescendant', 'bar-1')
  })
})
