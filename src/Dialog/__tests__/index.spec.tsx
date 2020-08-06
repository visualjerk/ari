import { DialogDisclosure, Dialog, useDialogState } from '..'
import {
  render,
  getByText,
  click,
  pressEnter,
  pressSpace,
} from '../../../test/utils'

describe('Dialog Composition', () => {
  let disclosure, content, nextTick

  beforeEach(() => {
    const renderResult = render({
      setup() {
        const dialog = useDialogState()
        return {
          dialog,
        }
      },
      components: {
        Dialog,
        DialogDisclosure,
      },
      template: `
    <div>
      <DialogDisclosure v-bind="dialog">foo</DialogDisclosure>
      <Dialog v-bind="dialog">bar</Dialog>
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
