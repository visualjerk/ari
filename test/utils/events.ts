import { getByText as _getByText, fireEvent } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

export const getByText = (text) => _getByText(document.body, text)
export const { click, dblClick, tab } = userEvent

type TypeOptions = {
  delay?: number
  skipClick?: boolean
  skipAutoClose?: boolean
  initialSelectionStart?: number
  initialSelectionEnd?: number
}

export const type = (
  element: Element,
  text: string,
  options: TypeOptions = {}
) => {
  if (options.skipClick == null) {
    options.skipClick = true
  }
  return userEvent.type(element, text, options)
}

export const mousedown = (element: Element) =>
  fireEvent(element, new MouseEvent('mousedown'))

export const mouseover = (element: Element) =>
  fireEvent(element, new MouseEvent('mouseover'))

const createPress = (key) => async (
  element: Element & { focus: () => void }
) => {
  element.focus()
  await type(element, key)
}

export const pressSpace = createPress(' ')
export const pressEnter = createPress('{enter}')
export const pressEsc = createPress('{esc}')

const createArrowPress = (identifier) => (element: Element) => {
  fireEvent(element, new KeyboardEvent('keydown', {
    key: identifier,
    code: identifier,
  }))
}

export const pressDown = createArrowPress('ArrowDown')
export const pressUp= createArrowPress('ArrowUp')
export const pressLeft= createArrowPress('ArrowLeft')
export const pressRight= createArrowPress('ArrowRight')
