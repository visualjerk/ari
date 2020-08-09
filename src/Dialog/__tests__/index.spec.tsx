import { DialogDisclosure, Dialog, useDialogState } from '..'
import {
  render,
  getByText,
  click,
  pressEnter,
  pressSpace,
  pressEsc,
  tab,
} from '../../../test/utils'

function createTestSetup({
  template = `
<div>
  <DialogDisclosure v-bind="dialog">foo</DialogDisclosure>
  <Dialog v-bind="dialog">bar</Dialog>
</div>
  `,
} = {}) {
  const { nextTick } = render({
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
    template,
  })

  return {
    nextTick,
    content: getByText('bar'),
    disclosure: getByText('foo'),
  }
}

describe('Dialog Composition', () => {
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

  it('disclosure closes content', async () => {
    const { content, disclosure, nextTick } = createTestSetup()
    click(disclosure)
    await nextTick()
    click(disclosure)
    await nextTick()
    expect(content).not.toBeVisible()
  })

  it('disclosure toggles content with enter', async () => {
    const { content, disclosure, nextTick } = createTestSetup()
    pressEnter(disclosure)
    await nextTick()
    expect(content).toBeVisible()
    pressEnter(disclosure)
    await nextTick()
    expect(content).not.toBeVisible()
  })

  it('disclosure toggles content with space', async () => {
    const { content, disclosure, nextTick } = createTestSetup()
    pressSpace(disclosure)
    await nextTick()
    expect(content).toBeVisible()
    pressSpace(disclosure)
    await nextTick()
    expect(content).not.toBeVisible()
  })

  it('show focuses dialog', async () => {
    const { content, disclosure, nextTick } = createTestSetup()
    click(disclosure)
    await nextTick()
    expect(content).toHaveFocus()
  })

  it('show focuses first focusable element', async () => {
    const { disclosure, nextTick } = createTestSetup({
      template: `
    <div>
      <DialogDisclosure v-bind="dialog">foo</DialogDisclosure>
      <Dialog v-bind="dialog">bar<button>first</button></Dialog>
    </div>
      `,
    })
    click(disclosure)
    await nextTick()
    expect(getByText('first')).toHaveFocus()
  })

  it('show focuses dialog with tabindex 0', async () => {
    const { content, disclosure, nextTick } = createTestSetup({
      template: `
    <div>
      <DialogDisclosure v-bind="dialog">foo</DialogDisclosure>
      <Dialog v-bind="dialog" tabindex="0">bar<button>first</button></Dialog>
    </div>
      `,
    })
    click(disclosure)
    await nextTick()
    expect(content).toHaveFocus()
  })

  it('esc hides dialog', async () => {
    const { content, disclosure, nextTick } = createTestSetup()
    click(disclosure)
    await nextTick()
    pressEsc(content)
    await nextTick()
    expect(content).not.toBeVisible()
  })

  it('hide focuses disclosure', async () => {
    const { content, disclosure, nextTick } = createTestSetup()
    click(disclosure)
    await nextTick()
    pressEsc(content)
    await nextTick()
    expect(disclosure).toHaveFocus()
  })

  it('click outside hides dialog', async () => {
    const { content, disclosure, nextTick } = createTestSetup({
      template: `
    <div>
      <DialogDisclosure v-bind="dialog">foo</DialogDisclosure>
      <Dialog v-bind="dialog">bar</Dialog>
      <button>outside</button>
    </div>
      `,
    })
    click(disclosure)
    await nextTick()
    click(getByText('outside'))
    await nextTick()
    expect(content).not.toBeVisible()
  })

  it('click inside does not hide dialog', async () => {
    const { content, disclosure, nextTick } = createTestSetup({
      template: `
    <div>
      <DialogDisclosure v-bind="dialog">foo</DialogDisclosure>
      <Dialog v-bind="dialog">bar<button>inside</button></Dialog>
    </div>
      `,
    })
    click(disclosure)
    await nextTick()
    click(getByText('inside'))
    await nextTick()
    expect(content).toBeVisible()
  })

  it('click on dialog does not hide dialog', async () => {
    const { content, disclosure, nextTick } = createTestSetup()
    click(disclosure)
    await nextTick()
    click(content)
    await nextTick()
    expect(content).toBeVisible()
  })

  it('tab focuses element after disclosure', async () => {
    const { disclosure, nextTick } = createTestSetup({
      template: `
    <div>
      <DialogDisclosure v-bind="dialog">foo</DialogDisclosure>
      <button>next</button>
      <Dialog v-bind="dialog">bar</Dialog>
    </div>
      `,
    })
    click(disclosure)
    await nextTick()
    tab()
    await nextTick()
    expect(getByText('next')).toHaveFocus()
  })

  it('shift tab focuses disclosure', async () => {
    const { disclosure, nextTick } = createTestSetup({
      template: `
    <div>
      <DialogDisclosure v-bind="dialog">foo</DialogDisclosure>
      <button>next</button>
      <Dialog v-bind="dialog">bar</Dialog>
    </div>
      `,
    })
    click(disclosure)
    await nextTick()
    tab({ shift: true })
    await nextTick()
    expect(disclosure).toHaveFocus()
  })

  it('tab focuses inner tabbable elements', async () => {
    const { disclosure, nextTick } = createTestSetup({
      template: `
    <div>
      <DialogDisclosure v-bind="dialog">foo</DialogDisclosure>
      <button>next</button>
      <Dialog v-bind="dialog">bar<button>inner</button><button>nextinner</button></Dialog>
    </div>
      `,
    })
    click(disclosure)
    await nextTick()
    tab()
    await nextTick()
    expect(getByText('nextinner')).toHaveFocus()
  })

  it('shift tab focuses inner tabbable elements', async () => {
    const { disclosure, nextTick } = createTestSetup({
      template: `
    <div>
      <DialogDisclosure v-bind="dialog">foo</DialogDisclosure>
      <button>next</button>
      <Dialog v-bind="dialog">bar<button>inner</button><button>nextinner</button></Dialog>
    </div>
      `,
    })
    click(disclosure)
    await nextTick()
    tab()
    await nextTick()
    tab({ shift: true })
    await nextTick()
    expect(getByText('inner')).toHaveFocus()
  })

  it('tab on disclosure focuses first tabbable element', async () => {
    const { disclosure, nextTick } = createTestSetup({
      template: `
    <div>
      <DialogDisclosure v-bind="dialog">foo</DialogDisclosure>
      <button>next</button>
      <Dialog v-bind="dialog">bar<button>inner</button></Dialog>
    </div>
      `,
    })
    click(disclosure)
    await nextTick()
    tab({ shift: true })
    await nextTick()
    tab()
    await nextTick()
    expect(getByText('inner')).toHaveFocus()
  })

  it('tab on disclosure focuses dialog with tabindex 0', async () => {
    const { content, disclosure, nextTick } = createTestSetup({
      template: `
    <div>
      <DialogDisclosure v-bind="dialog">foo</DialogDisclosure>
      <button>next</button>
      <Dialog v-bind="dialog" tabindex="0">bar</Dialog>
    </div>
      `,
    })
    click(disclosure)
    await nextTick()
    tab({ shift: true })
    await nextTick()
    tab()
    await nextTick()
    expect(content).toHaveFocus()
  })

  it('tab on disclosure focuses next element when dialog is hidden', async () => {
    const { disclosure, nextTick } = createTestSetup({
      template: `
    <div>
      <DialogDisclosure v-bind="dialog">foo</DialogDisclosure>
      <button>next</button>
      <Dialog v-bind="dialog">bar<button>inner</button></Dialog>
    </div>
      `,
    })
    disclosure.focus()
    tab()
    await nextTick()
    expect(getByText('next')).toHaveFocus()
  })

  it('focus out from disclosure hides dialog', async () => {
    const { content, disclosure, nextTick } = createTestSetup({
      template: `
    <div>
      <button>first</button>
      <DialogDisclosure v-bind="dialog">foo</DialogDisclosure>
      <Dialog v-bind="dialog">bar</Dialog>
    </div>
      `,
    })
    click(disclosure)
    await nextTick()
    tab({ shift: true })
    await nextTick()
    tab({ shift: true })
    await nextTick()
    expect(content).not.toBeVisible()
  })

  it('focus out from dialog hides dialog', async () => {
    const { content, disclosure, nextTick } = createTestSetup({
      template: `
    <div>
      <DialogDisclosure v-bind="dialog">foo</DialogDisclosure>
      <button>next</button>
      <Dialog v-bind="dialog">bar</Dialog>
    </div>
      `,
    })
    click(disclosure)
    await nextTick()
    tab()
    await nextTick()
    expect(content).not.toBeVisible()
  })
})
