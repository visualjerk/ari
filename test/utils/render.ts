import { mount } from '@vue/test-utils'
import { App } from 'vue'

const IGNORED_WARNINGS = ['Non-function value encountered for default slot.']

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
    global: {
      plugins: [ignoreWarnings],
    },
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

function ignoreWarnings(app: App) {
  app.config.warnHandler = function (msg, ...args) {
    if (IGNORED_WARNINGS.some((warning) => msg.includes(warning))) {
      return
    }
    console.warn(`[Vue warn]: ${msg}`, ...args)
  }
}

afterEach(() => {
  cleanup()
})
