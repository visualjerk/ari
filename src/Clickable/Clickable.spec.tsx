import { Clickable } from '.'
import { renderJsx, getByText, pressSpace, pressEnter } from '../../test/utils'

describe('Clickable', () => {
  it('renders correctly', () => {
    renderJsx(<Clickable>foo</Clickable>)
    expect(getByText('foo')).toMatchInlineSnapshot(`
      <div
        tabindex="0"
      >
        foo
      </div>
    `)
  })

  it('emits click event on press space', () => {
    const clickHandler = jest.fn()
    renderJsx(<Clickable onClick={clickHandler}>foo</Clickable>)
    pressSpace(getByText('foo'))
    expect(clickHandler).toBeCalledTimes(1)
  })

  it('emits no click event on keydown space when disabled', () => {
    const clickHandler = jest.fn()
    renderJsx(
      <Clickable onClick={clickHandler} disabled>
        foo
      </Clickable>
    )
    pressSpace(getByText('foo'))
    expect(clickHandler).toBeCalledTimes(0)
  })

  it('emits only one click event on press space as button', () => {
    const clickHandler = jest.fn()
    renderJsx(
      <Clickable onClick={clickHandler} as="button">
        foo
      </Clickable>
    )
    pressSpace(getByText('foo'))
    expect(clickHandler).toBeCalledTimes(1)
  })

  it('emits click event on press enter', () => {
    const clickHandler = jest.fn()
    renderJsx(<Clickable onClick={clickHandler}>foo</Clickable>)
    pressEnter(getByText('foo'))
    expect(clickHandler).toBeCalledTimes(1)
  })

  it('emits no click event on press enter when disabled', () => {
    const clickHandler = jest.fn()
    renderJsx(
      <Clickable onClick={clickHandler} disabled>
        foo
      </Clickable>
    )
    pressEnter(getByText('foo'))
    expect(clickHandler).toBeCalledTimes(0)
  })

  it('emits only one click event on press enter as button', async () => {
    const clickHandler = jest.fn()
    renderJsx(
      <Clickable onClick={clickHandler} as="button">
        foo
      </Clickable>
    )
    pressEnter(getByText('foo'))
    expect(clickHandler).toBeCalledTimes(1)
  })
})
