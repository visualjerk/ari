import { onMounted, Ref } from 'vue'

type UseOnElementCallback = (element: HTMLElement) => void

export function getElementFromRef(elementRef: Ref): HTMLElement {
  if (!elementRef.value) {
    return null
  }
  return elementRef.value.$el || elementRef.value
}

export function useOnElement(elementRef: Ref, use: UseOnElementCallback) {
  onMounted(() => {
    if (!elementRef.value) {
      return
    }
    const element: HTMLElement = getElementFromRef(elementRef)
    use(element)
  })
}

const TABBABLE_SELECTOR =
  'a[href], area[href], input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable], audio[controls], video[controls], summary, [tabindex^="0"], [tabindex^="1"], [tabindex^="2"], [tabindex^="3"], [tabindex^="4"], [tabindex^="5"], [tabindex^="6"], [tabindex^="7"], [tabindex^="8"], [tabindex^="9"]'

export function isTabbable(element: HTMLElement): boolean {
  return element.matches(TABBABLE_SELECTOR)
}

export function getTabbableElements(element: HTMLElement): HTMLElement[] {
  const tabbableElements = Array.from(
    element.querySelectorAll(TABBABLE_SELECTOR) as NodeListOf<HTMLElement>
  )
  if (isTabbable(element)) {
    tabbableElements.unshift(element)
  }
  return tabbableElements
}

export function getNextTabbable(element: HTMLElement): HTMLElement {
  const tabbableElements = getTabbableElements(document.body)
  const indexOfElement = tabbableElements.indexOf(element)
  return tabbableElements[indexOfElement + 1]
}

export function isFocused(element: HTMLElement): boolean {
  return element === document.activeElement
}

export function focusIsWithin(element: HTMLElement) {
  return elementIsWithin(element, document.activeElement as HTMLElement)
}

export function elementIsWithin(container: HTMLElement, element: HTMLElement) {
  if (!container || !element) {
    return false
  }
  return container.contains(element as HTMLElement)
}

export function focusFirstFocusable(element: HTMLElement) {
  const elementToFocus = getTabbableElements(element)[0] || element
  elementToFocus.focus()
}
