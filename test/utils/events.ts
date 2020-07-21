import { getByText as _getByText, fireEvent } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

export const getByText = (text) => _getByText(document.body, text)
export const { click, dblClick, type } = userEvent

export const mousedown = (element: Element) =>
  fireEvent(element, new MouseEvent('mousedown'))

export const mouseover = (element: Element) =>
  fireEvent(element, new MouseEvent('mouseover'))

const createPress = (key) => async (element: Element & { focus: Function }) => {
  element.focus()

  // userEvent does not yet support this
  // TODO: create ticket for https://codesandbox.io/s/angry-bas-bttix?file=/src/user-event.test.js
  if (key === ' ' && element.tagName === 'BUTTON') {
    click(element)
  }

  try {
    await type(element, key, { skipClick: true })
  } catch (error) {
    // Ignore userEvent TypeError when called on an element without a value property
    // TODO: create ticket for https://codesandbox.io/s/agitated-meitner-3zhxf?file=/src/user-event.test.js
    if (!(error instanceof TypeError)) {
      throw error
    }
  }
}

export const pressSpace = createPress(' ')
export const pressEnter = createPress('{enter}')
