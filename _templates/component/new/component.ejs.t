---
to: "src/<%= name %>/<%= name %>.ts"
---
import { ComponentObjectPropsOptions } from 'vue'
import { defineComponent } from '../utils'
import { use<%= h.capitalize(parent) %>, <%= parent %>Props, <%= h.capitalize(parent) %>Props } from '../<%= parent %>'

export interface <%= h.capitalize(name) %>Props extends <%= h.capitalize(parent) %>Props {}

export const <%= name %>Props: ComponentObjectPropsOptions<<%= h.capitalize(name) %>Props> = {
  ...<%= parent %>Props,
}

export function use<%= h.capitalize(name) %>(props: <%= h.capitalize(name) %>Props) {
  const <%= parent %> = use<%= h.capitalize(parent) %>(props)

  return {
    ...<%= parent %>,
  }
}

export const <%= h.capitalize(name) %> = defineComponent(<%= name %>Props, use<%= h.capitalize(name) %>)
