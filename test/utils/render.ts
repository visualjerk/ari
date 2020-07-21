import { mount } from '@vue/test-utils'

const mountedWrappers = new Set()

export const renderJsx = (template) => {
  const component = {
    render() {
      return template
    },
  }
  return render(component)
}

export const render = (component, options = {}) => {
  const wrapper = mount(component, {
    ...options,
    attachTo: document.body,
  })
  mountedWrappers.add(wrapper)
  return {
    nextTick: wrapper.vm.$nextTick,
  }
}

function cleanupWrapper(wrapper) {
  if (
    wrapper.element.parentNode &&
    wrapper.element.parentNode.parentNode === document.body
  ) {
    document.body.removeChild(wrapper.element.parentNode)
  }

  try {
    wrapper.unmount()
  } finally {
    mountedWrappers.delete(wrapper)
  }
}

function cleanup() {
  mountedWrappers.forEach(cleanupWrapper)
}

afterEach(() => {
  cleanup()
})
