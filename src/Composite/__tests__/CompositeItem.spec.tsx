import { ref } from 'vue'
import { CompositeItem } from '..'
import { renderJsx, getByText } from '../../../test/utils'

describe('CompositeItem', () => {
  it('renders correctly', async () => {
    const { nextTick } = renderJsx(
      <CompositeItem baseId="id" selectedItem={ref(0)} registerItem={() => 0}>
        foo
      </CompositeItem>
    )
    await nextTick()
    expect(getByText('foo')).toMatchInlineSnapshot(`
      <div
        aria-selected="true"
        id="id-0"
        tabindex="-1"
      >
        foo
      </div>
    `)
  })

  it('renders unselected correctly', async () => {
    const { nextTick } = renderJsx(
      <CompositeItem baseId="id" selectedItem={ref(1)} registerItem={() => 0}>
        foo
      </CompositeItem>
    )
    await nextTick()
    expect(getByText('foo')).toMatchInlineSnapshot(`
      <div
        id="id-0"
        tabindex="-1"
      >
        foo
      </div>
    `)
  })
})
