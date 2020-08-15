import { PopoverDisclosure, Popover, usePopoverState } from '..'
import { render, getByText, click } from '../../../test/utils'

function createTestSetup({
  template = `
<div>
  <PopoverDisclosure v-bind="popover">foo</PopoverDisclosure>
  <Popover v-bind="popover">bar</Popover>
</div>
  `,
} = {}) {
  const { nextTick } = render({
    setup() {
      const popover = usePopoverState()
      return {
        popover,
      }
    },
    components: {
      Popover,
      PopoverDisclosure,
    },
    template,
  })

  return {
    nextTick,
    content: getByText('bar'),
    disclosure: getByText('foo'),
  }
}

describe('Popover Composition', () => {
  it('content is hidden by default', () => {
    const { content } = createTestSetup()
    expect(content).not.toBeVisible()
  })

  it('disclosure opens content', async () => {
    const { content, disclosure, nextTick } = createTestSetup()
    expect(content).not.toBeVisible()
    click(disclosure)
    await nextTick()
    expect(content).toBeVisible()
  })

  it('is positioned with popper when visible', async () => {
    const { disclosure, content, nextTick } = createTestSetup()
    click(disclosure)
    await nextTick()
    await nextTick()
    expect(content).toHaveStyle('position: absolute')
    expect(content).toHaveAttribute('data-popper-placement')
  })

  it('is not positioned with popper when hidden', async () => {
    const { disclosure, content, nextTick } = createTestSetup()
    click(disclosure)
    await nextTick()
    await nextTick()
    click(disclosure)
    await nextTick()
    await nextTick()
    expect(content).not.toHaveStyle('position: absolute')
    expect(content).not.toHaveAttribute('data-popper-placement')
  })
})
