import { Portal } from '.'
import { renderJsx, getByText } from '../../test/utils'

describe('Portal', () => {
  it('portal content renders outside its container', async () => {
    const { nextTick } = renderJsx(
      <div>
        container
        <Portal>
          <div>foo</div>
        </Portal>
      </div>
    )
    await nextTick()
    expect(getByText('foo').parentElement).not.toBe(getByText('container'))
  })
})
