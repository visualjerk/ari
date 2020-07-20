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
