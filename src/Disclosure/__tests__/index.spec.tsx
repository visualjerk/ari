import { Disclosure, DisclosureContent, useDisclosureState } from '..'
import {
  render,
  getByText,
  click,
  pressEnter,
  pressSpace,
} from '../../../test/utils'

describe('Disclosure Composition', () => {
  let disclosure, content, nextTick

  beforeEach(() => {
    const renderResult = render({
      setup() {
        const disclosure = useDisclosureState()
        return {
          disclosure,
        }
      },
      components: {
        Disclosure,
        DisclosureContent,
      },
      template: `
    <div>
      <Disclosure v-bind="disclosure">foo</Disclosure>
      <DisclosureContent v-bind="disclosure">bar</DisclosureContent>
    </div>
      `,
    })

    nextTick = renderResult.nextTick
    content = getByText('bar')
    disclosure = getByText('foo')
  })

  it('content is hidden by default', () => {
    expect(content).not.toBeVisible()
  })

  it('disclosure opens content', async () => {
    expect(content).not.toBeVisible()
    click(disclosure)
    await nextTick()
    expect(content).toBeVisible()
  })

  it('disclosure closes content', async () => {
    click(disclosure)
    await nextTick()
    click(disclosure)
    await nextTick()
    expect(content).not.toBeVisible()
  })

  it('disclosure toggles content with enter', async () => {
    pressEnter(disclosure)
    await nextTick()
    expect(content).toBeVisible()
    pressEnter(disclosure)
    await nextTick()
    expect(content).not.toBeVisible()
  })

  it('disclosure toggles content with space', async () => {
    pressSpace(disclosure)
    await nextTick()
    expect(content).toBeVisible()
    pressSpace(disclosure)
    await nextTick()
    expect(content).not.toBeVisible()
  })
})
