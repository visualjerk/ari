import { onMounted, Ref } from 'vue'

type UseOnElementCallback = (element: Element) => void

export function useOnElement(elementRef: Ref, use: UseOnElementCallback) {
  onMounted(() => {
    if (!elementRef.value) {
      return
    }
    const element: Element = elementRef.value.$el || elementRef.value
    use(element)
  })
}

export function getFocusableElements(
  element: HTMLElement
): NodeListOf<HTMLElement> {
  return element.querySelectorAll(
    'a[href], area[href], input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable], audio[controls], video[controls], summary, [tabindex^="0"], [tabindex^="1"], [tabindex^="2"], [tabindex^="3"], [tabindex^="4"], [tabindex^="5"], [tabindex^="6"], [tabindex^="7"], [tabindex^="8"], [tabindex^="9"]'
  )
}
