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
  await type(element, key, { skipClick: true })
}

export const pressSpace = createPress(' ')
export const pressEnter = createPress('{enter}')
