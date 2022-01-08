import { nextTick } from 'vue'
import { Radio, useRadioState } from '..'
import { render, getByLabelText, click } from '../../../test/utils'

function createTestSetup({
  template = `
  <label><Radio v-bind="radio" value="test" />foo</label>
  `,
} = {}) {
  render({
    setup() {
      const radio = useRadioState()
      return {
        radio,
      }
    },
    components: {
      Radio,
    },
    template,
  })

  return {
    radio: getByLabelText('foo') as HTMLInputElement,
  }
}

describe('Radio Composition', () => {
  it('is checked on click', async () => {
    const { radio } = createTestSetup()
    expect(radio.checked).toBe(false)
    click(radio)
    await nextTick()
    expect(radio.checked).toBe(true)
  })
})
