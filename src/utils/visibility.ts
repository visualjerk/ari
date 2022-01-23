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

function setDisplay(el: RendererNode, value: unknown): void {
  el.style.display = value ? el._vod : 'none'
  el.hidden = value ? null : true
}

export function useVisibilityTransition(
  visibleRef: Ref<boolean>,
  elementRef: Ref<HTMLElement> = null
) {
  if (unref(visibleRef) == null) {
    return
  }

  let vnode = null

  watch(visibleRef, (visible) => {
    const { transition } = vnode
    const el = elementRef ? getElementFromRef(elementRef) : vnode.el
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
    const el = elementRef ? getElementFromRef(elementRef) : vnode.el
    el._vod = el.style.display === 'none' ? '' : el.style.display
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
