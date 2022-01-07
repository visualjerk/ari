import { ref } from 'vue'
import { Radio } from '..'
import { renderJsx, getByLabelText } from '../../../test/utils'

describe('Radio', () => {
  it('renders correctly', async () => {
    const { nextTick } = renderJsx(
      <Radio
        baseId="id"
        selectedItem={ref(0)}
        registerItem={() => 0}
        unregisterItem={() => null}
        aria-label="foo"
      />
    )
    await nextTick()
    expect(getByLabelText('foo')).toMatchInlineSnapshot(`
      <input
        aria-checked="true"
        aria-label="foo"
        aria-selected="true"
        id="id-0"
        tabindex="-1"
        type="radio"
      />
    `)
  })

  it('renders unselected correctly', async () => {
    const { nextTick } = renderJsx(
      <Radio
        baseId="id"
        selectedItem={ref(1)}
        registerItem={() => 0}
        unregisterItem={() => null}
        aria-label="foo"
      />
    )
    await nextTick()
    expect(getByLabelText('foo')).toMatchInlineSnapshot(`
      <input
        aria-checked="false"
        aria-label="foo"
        id="id-0"
        tabindex="-1"
        type="radio"
      />
    `)
  })
})
