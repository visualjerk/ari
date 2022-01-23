import {
  unref,
  watch,
  onUpdated,
  onMounted,
  getCurrentInstance,
  Ref,
  RendererNode,
} from 'vue'
import { getElementFromRef } from './element'

export function useVisibilityTransition(
  visibleRef: Ref<boolean>,
  elementRef: Ref<HTMLElement>
) {
  if (unref(visibleRef) == null) {
    return
  }

  let vnode
  let initialDisplayValue

  function setDisplay(el: RendererNode, value: unknown): void {
    el.style.display = value ? initialDisplayValue : 'none'
    el.hidden = value ? null : true
  }

  watch(visibleRef, (visible) => {
    const { transition } = vnode
    const el = getElementFromRef(elementRef)
    if (!transition) {
      setDisplay(el, visible)
      return
    }

    if (visible) {
      transition.beforeEnter(el)
      setDisplay(el, true)
      transition.enter(el)
      return
    }

    transition.leave(el, () => {
      setDisplay(el, false)
    })
  })

  onMounted(() => {
    const visible = unref(visibleRef)
    const current = getCurrentInstance()
    vnode = current.vnode
    const { transition } = vnode
    const el = getElementFromRef(elementRef)
    initialDisplayValue = el.style.display === 'none' ? '' : el.style.display
    if (transition && visible) {
      transition.beforeEnter(el)
      transition.enter(el)
      return
    }
    setDisplay(el, visible)
  })

  onUpdated(() => {
    const current = getCurrentInstance()
    vnode = current.vnode
  })
}
