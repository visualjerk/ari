import { ModalDisclosure, Modal, useModalState } from '..'
import { render, getByText, click, tab } from '../../../test/utils'

function createTestSetup({
  template = `
<div>
  <ModalDisclosure v-bind="modal">foo</ModalDisclosure>
  <Modal v-bind="modal">bar</Modal>
</div>
  `,
} = {}) {
  const { nextTick } = render({
    setup() {
      const modal = useModalState()
      return {
        modal,
      }
    },
    components: {
      Modal,
      ModalDisclosure,
    },
    template,
  })

  return {
    nextTick,
    content: getByText('bar'),
    disclosure: getByText('foo'),
  }
}

describe('Modal Composition', () => {
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

  it('focus is trapped inside modal', async () => {
    const { disclosure, content, nextTick } = createTestSetup({
      template: `
    <div>
      <ModalDisclosure v-bind="modal">foo</ModalDisclosure>
      <Modal v-bind="modal">bar</Modal>
      <button>after</button>
    </div>
      `,
    })
    click(disclosure)
    await nextTick()
    tab()
    await nextTick()
    expect(content).toHaveFocus()
  })

  it('tab focuses elements inside modal', async () => {
    const { disclosure, nextTick } = createTestSetup({
      template: `
    <div>
      <ModalDisclosure v-bind="modal">foo</ModalDisclosure>
      <Modal v-bind="modal">
        bar
        <button>one</button>
        <button>two</button>
      </Modal>
    </div>
      `,
    })
    click(disclosure)
    await nextTick()
    tab()
    await nextTick()
    expect(getByText('two')).toHaveFocus()
  })

  it('tab on last tabbable element focuses first element', async () => {
    const { disclosure, nextTick } = createTestSetup({
      template: `
    <div>
      <ModalDisclosure v-bind="modal">foo</ModalDisclosure>
      <Modal v-bind="modal">
        bar
        <button>one</button>
        <button>two</button>
      </Modal>
      <button>after</button>
    </div>
      `,
    })
    click(disclosure)
    await nextTick()
    tab()
    await nextTick()
    tab()
    await nextTick()
    expect(getByText('one')).toHaveFocus()
  })

  it('shift tab on first tabbable element focuses last tabbable element', async () => {
    const { disclosure, nextTick } = createTestSetup({
      template: `
    <div>
      <button>before</button>
      <ModalDisclosure v-bind="modal">foo</ModalDisclosure>
      <Modal v-bind="modal">
        bar
        <button>one</button>
        <button>two</button>
      </Modal>
    </div>
      `,
    })
    click(disclosure)
    await nextTick()
    tab({ shift: true })
    await nextTick()
    expect(getByText('two')).toHaveFocus()
  })

  it('shift tab on last tabbable element focuses previous tabbable element', async () => {
    const { disclosure, nextTick } = createTestSetup({
      template: `
    <div>
      <button>before</button>
      <ModalDisclosure v-bind="modal">foo</ModalDisclosure>
      <Modal v-bind="modal">
        bar
        <button>one</button>
        <button>two</button>
        <button>three</button>
      </Modal>
    </div>
      `,
    })
    click(disclosure)
    await nextTick()
    tab()
    await nextTick()
    tab()
    await nextTick()
    tab({ shift: true })
    await nextTick()
    expect(getByText('two')).toHaveFocus()
  })
})
