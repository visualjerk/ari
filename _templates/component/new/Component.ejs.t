---
to: "src/<%= name %>/<%= name %>.ts"
---
import { ComponentObjectPropsOptions } from 'vue'
import { defineComponent } from '../utils'
import { use<%= parent %>, <%= h.changeCase.camelCase(parent) %>Props, <%= parent %>Props } from '../<%= parent %>'

export interface <%= name %>Props extends <%= parent %>Props {}

export const <%= h.changeCase.camelCase(name) %>Props: ComponentObjectPropsOptions<<%= name %>Props> = {
  ...<%= h.changeCase.camelCase(parent) %>Props,
}

export function use<%= name %>(props: <%= name %>Props) {
  const <%= parent %> = use<%= parent %>(props)

  return {
    ...<%= parent %>,
  }
}

export const <%= name %> = defineComponent(<%= h.changeCase.camelCase(name) %>Props, use<%= name %>)
