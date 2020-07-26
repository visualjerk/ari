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

  it('disclosure toggles content visibility', async () => {
    expect(content).not.toBeVisible()
    click(disclosure)
    await nextTick()
    expect(content).toBeVisible()
  })

  it('disclosure toggles content with enter', async () => {
    expect(content).not.toBeVisible()
    pressEnter(disclosure)
    await nextTick()
    expect(content).toBeVisible()
  })

  it('disclosure toggles content with space', async () => {
    expect(content).not.toBeVisible()
    pressSpace(disclosure)
    await nextTick()
    expect(content).toBeVisible()
  })
})
