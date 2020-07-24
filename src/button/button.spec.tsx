import { Button } from '.'
import { renderJsx, getByText } from '../../test/utils'

describe('Button', () => {
  it('renders correctly', async () => {
    const { nextTick } = renderJsx(<Button>foo</Button>)
    await nextTick()
    expect(getByText('foo')).toMatchInlineSnapshot(`
      <button
        type="button"
      >
        foo
      </button>
    `)
  })

  it('can render as div', async () => {
    const { nextTick } = renderJsx(<Button as="div">foo</Button>)
    await nextTick()
    expect(getByText('foo')).toMatchInlineSnapshot(`
      <div
        role="button"
        tabindex="0"
      >
        foo
      </div>
    `)
  })

  it('can render as a tag', async () => {
    const { nextTick } = renderJsx(<Button as="a">foo</Button>)
    await nextTick()
    // type="" seems to be a bug in Vue
    // https://github.com/vuejs/vue-next/issues/1701
    expect(getByText('foo')).toMatchInlineSnapshot(`
      <a
        type=""
      >
        foo
      </a>
    `)
  })
})
