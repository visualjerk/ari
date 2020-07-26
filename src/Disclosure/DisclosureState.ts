import { ComponentObjectPropsOptions } from 'vue'

export interface DisclosureStateProps {
  baseId: string
  visible: boolean
}

export const disclosureStateProps: ComponentObjectPropsOptions<DisclosureStateProps> = {
  baseId: {
    type: String,
    required: true,
  },
  visible: {
    type: Boolean,
    required: true,
  },
}
