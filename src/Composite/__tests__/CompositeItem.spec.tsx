import { ref } from 'vue'
import { CompositeItem } from '..'
import { renderJsx, getByText, click } from '../../../test/utils'

describe('CompositeItem', () => {
  it('renders correctly', async () => {
    const { nextTick } = renderJsx(
      <CompositeItem
        baseId="id"
        selectedItem={ref(0)}
        registerItem={() => 0}
        unregisterItem={() => null}
      >
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
      <CompositeItem
        baseId="id"
        selectedItem={ref(1)}
        registerItem={() => 0}
        unregisterItem={() => null}
      >
        foo
      </CompositeItem>
    )
    await nextTick()
    expect(getByText('foo')).toMatchInlineSnapshot(`
      <div
        aria-selected="false"
        id="id-0"
        tabindex="-1"
      >
        foo
      </div>
    `)
  })

  it('handles click', async () => {
    const testFn = jest.fn()
    const { nextTick } = renderJsx(
      <CompositeItem
        baseId="id"
        selectedItem={ref(1)}
        registerItem={() => 0}
        unregisterItem={() => null}
        move={() => null}
        focus={() => null}
        onClick={testFn}
      >
        foo
      </CompositeItem>
    )
    await nextTick()
    const item = getByText('foo')
    click(item)
    expect(testFn).toBeCalledTimes(1)
  })
})
