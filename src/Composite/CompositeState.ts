import { ComponentObjectPropsOptions, ref, Ref } from 'vue'

export interface CompositeStateReturn {
  baseId: string
  selectedItem: Ref<number>
}

export const compositeStateReturn: ComponentObjectPropsOptions<CompositeStateReturn> = {
  baseId: {
    type: String,
    required: true,
  },
  selectedItem: {
    required: true,
  },
}

export function useCompositeState(): CompositeStateReturn {
  return {
    baseId: 'composite-0',
    selectedItem: ref(0),
  }
}
