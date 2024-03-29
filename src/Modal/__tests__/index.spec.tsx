import { nextTick } from 'vue'
import { ModalDisclosure, Modal, ModalBackdrop, useModalState } from '..'
import { render, getByText, click, tab } from '../../../test/utils'

function createTestSetup({
  template = `
<div>
  <ModalDisclosure v-bind="modal">foo</ModalDisclosure>
  <Modal v-bind="modal">bar</Modal>
</div>
  `,
  visible = false,
} = {}) {
  render({
    setup() {
      const modal = useModalState()
      if (visible) {
        modal.show()
      }
      return {
        modal,
      }
    },
    components: {
      Modal,
      ModalBackdrop,
      ModalDisclosure,
    },
    template,
  })

  return {
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
    const { content, disclosure } = createTestSetup()
    expect(content).not.toBeVisible()
    click(disclosure)
    await nextTick()
    expect(content).toBeVisible()
  })

  it('backdrop is hidden by default', () => {
    createTestSetup({
      template: `
    <div>
      <ModalDisclosure v-bind="modal">foo</ModalDisclosure>
      <ModalBackdrop v-bind="modal">baz</ModalBackdrop>
      <Modal v-bind="modal">bar</Modal>
    </div>
      `,
    })
    expect(getByText('baz')).not.toBeVisible()
  })

  it('disclosure opens backdrop', async () => {
    const { disclosure } = createTestSetup({
      template: `
    <div>
      <ModalDisclosure v-bind="modal">foo</ModalDisclosure>
      <ModalBackdrop v-bind="modal">baz</ModalBackdrop>
      <Modal v-bind="modal">bar</Modal>
    </div>
      `,
    })
    const backdrop = getByText('baz')
    expect(backdrop).not.toBeVisible()
    click(disclosure)
    await nextTick()
    expect(backdrop).toBeVisible()
  })

  it('modal renders inside backdrop instead of portal', async () => {
    const { disclosure, content } = createTestSetup({
      template: `
    <div>
      <ModalDisclosure v-bind="modal">foo</ModalDisclosure>
      <ModalBackdrop v-bind="modal">
        baz
        <Modal v-bind="modal">bar</Modal>
      </ModalBackdrop>
    </div>
      `,
    })
    const backdrop = getByText('baz')
    click(disclosure)
    await nextTick()
    expect(content.parentElement).toBe(backdrop)
  })

  it('focus is trapped inside modal', async () => {
    const { disclosure, content } = createTestSetup({
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
    const { disclosure } = createTestSetup({
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
    const { disclosure } = createTestSetup({
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
    const { disclosure } = createTestSetup({
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
    const { disclosure } = createTestSetup({
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

  it('is focused initially when visible', async () => {
    const { content } = createTestSetup({
      visible: true,
    })
    expect(content).toHaveFocus()
  })
})
