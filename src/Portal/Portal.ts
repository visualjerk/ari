import { h, Teleport, defineComponent } from 'vue'

let portalTarget

export const Portal = defineComponent({
  render() {
    if (!portalTarget) {
      portalTarget = document.createElement('div')
      document.body.append(portalTarget)
    }
    return h(Teleport, { to: portalTarget }, this.$slots.default())
  },
})
