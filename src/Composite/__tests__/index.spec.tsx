import { ref } from 'vue'
import { Composite, CompositeItem, useCompositeState } from '..'
import {
  render,
  getByText,
  click,
  pressDown,
  pressUp,
  pressRight,
  pressLeft,
  pressSpace,
  pressEnter,
} from '../../../test/utils'

function createTestSetup({
  template = `
<Composite v-bind="composite">
  <CompositeItem v-bind="composite">foo</CompositeItem>
  <CompositeItem v-bind="composite">bar</CompositeItem>
  <CompositeItem v-bind="composite">baz</CompositeItem>
</Composite>
  `,
  props = {},
} = {}) {
  const { nextTick } = render({
    setup() {
      const composite = useCompositeState()
      return {
        composite,
        ...props,
      }
    },
    components: {
      Composite,
      CompositeItem,
    },
    template,
  })

  return {
    nextTick,
    composite: getByText('foo').parentElement,
    firstItem: getByText('foo'),
    secondItem: getByText('bar'),
    thirdItem: getByText('baz'),
  }
}

describe('Composite Composition', () => {
  it('moves selection on arrow down', async () => {
    const { nextTick, composite, firstItem, secondItem } = createTestSetup()
    expect(firstItem).toHaveAttribute('aria-selected', 'true')
    pressDown(composite)
    await nextTick()
    expect(secondItem).toHaveAttribute('aria-selected', 'true')
  })

  it('moves selection on arrow up', async () => {
    const { nextTick, composite, firstItem, secondItem } = createTestSetup()
    expect(firstItem).toHaveAttribute('aria-selected', 'true')
    pressDown(composite)
    await nextTick()
    expect(secondItem).toHaveAttribute('aria-selected', 'true')
    pressUp(composite)
    await nextTick()
    expect(firstItem).toHaveAttribute('aria-selected', 'true')
  })

  it('moves selection on arrow right', async () => {
    const { nextTick, composite, firstItem, secondItem } = createTestSetup()
    expect(firstItem).toHaveAttribute('aria-selected', 'true')
    pressRight(composite)
    await nextTick()
    expect(secondItem).toHaveAttribute('aria-selected', 'true')
  })

  it('moves selection on arrow left', async () => {
    const { nextTick, composite, firstItem, secondItem } = createTestSetup()
    expect(firstItem).toHaveAttribute('aria-selected', 'true')
    pressRight(composite)
    await nextTick()
    expect(secondItem).toHaveAttribute('aria-selected', 'true')
    pressLeft(composite)
    await nextTick()
    expect(firstItem).toHaveAttribute('aria-selected', 'true')
  })

  it('click on item sets focus on composite', () => {
    const { composite, firstItem } = createTestSetup()
    click(firstItem)
    expect(composite).toHaveFocus()
  })

  it('click on item sets active element', async () => {
    const { nextTick, secondItem } = createTestSetup()
    click(secondItem)
    await nextTick()
    expect(secondItem).toHaveAttribute('aria-selected', 'true')
  })

  it('enter on active element triggers click', async () => {
    const testFn = jest.fn()
    const { nextTick, composite, secondItem } = createTestSetup({
      template: `
      <Composite v-bind="composite">
        <CompositeItem v-bind="composite">foo</CompositeItem>
        <CompositeItem v-bind="composite" @click="testFn">bar</CompositeItem>
        <CompositeItem v-bind="composite">baz</CompositeItem>
      </Composite>`,
      props: {
        testFn,
      },
    })
    pressDown(composite)
    await nextTick()
    expect(secondItem).toHaveAttribute('aria-selected', 'true')
    await pressEnter(composite)
    expect(testFn).toBeCalledTimes(1)
  })

  it('skips disabled items', async () => {
    const { nextTick, composite, firstItem, thirdItem } = createTestSetup({
      template: `
      <Composite v-bind="composite">
        <CompositeItem v-bind="composite">foo</CompositeItem>
        <CompositeItem v-bind="composite" disabled>bar</CompositeItem>
        <CompositeItem v-bind="composite">baz</CompositeItem>
      </Composite>`,
    })
    expect(firstItem).toHaveAttribute('aria-selected', 'true')
    pressDown(composite)
    await nextTick()
    expect(thirdItem).toHaveAttribute('aria-selected', 'true')
    pressUp(composite)
    await nextTick()
    expect(firstItem).toHaveAttribute('aria-selected', 'true')
  })

  it('does not select disabled item', async () => {
    const { secondItem } = createTestSetup({
      template: `
      <Composite v-bind="composite">
        <CompositeItem v-bind="composite" disabled>foo</CompositeItem>
        <CompositeItem v-bind="composite">bar</CompositeItem>
        <CompositeItem v-bind="composite">baz</CompositeItem>
      </Composite>`,
    })
    expect(secondItem).toHaveAttribute('aria-selected', 'true')
  })

  it('respects optional items', async () => {
    const show = ref(true)
    const { nextTick, composite, thirdItem } = createTestSetup({
      template: `
      <Composite v-bind="composite">
        <CompositeItem v-bind="composite">foo</CompositeItem>
        <CompositeItem v-bind="composite" v-if="show">bar</CompositeItem>
        <CompositeItem v-bind="composite">baz</CompositeItem>
      </Composite>`,
      props: {
        show,
      },
    })
    show.value = false
    await nextTick()
    pressDown(composite)
    await nextTick()
    expect(thirdItem).toHaveAttribute('aria-selected', 'true')
  })

  // it('respects moving html position', async () => {
  //   const position = ref(['foo', 'bar', 'baz'])
  //   const { nextTick, composite, firstItem, thirdItem } = createTestSetup({
  //     template: `
  //     <Composite v-bind="composite">
  //       <CompositeItem v-bind="composite" v-for="item in position" :key="item">{{ item }}</CompositeItem>
  //     </Composite>`,
  //     props: {
  //       position,
  //     },
  //   })
  //   expect(firstItem).toHaveAttribute('aria-selected', 'true')
  //   position.value = ['foo', 'baz', 'bar']
  //   await nextTick()
  //   pressDown(composite)
  //   await nextTick()
  //   expect(thirdItem).toHaveAttribute('aria-selected', 'true')
  // })
})
