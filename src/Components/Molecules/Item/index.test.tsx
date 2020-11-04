import React from 'react'
import { fireEvent, screen, render } from '@testing-library/react'
import Item from '.'
import { Todo } from '../../../dataStructure'

const todo: Todo = {
  id: '8btxpD9kDBlo',
  bodyText: 'cut tomato',
  completed: false,
}

test('should each initialAppstate todo object value is set to Item element', () => {
  const handleEditItem = jest.fn()
  const handleToggleItem = jest.fn()
  const removeItem = jest.fn()

  render(
    <Item
      todo={todo}
      editItem={handleEditItem}
      toggleItem={handleToggleItem}
      removeItem={removeItem}
    />
  )

  expect(screen.getByTestId('todo-item')).toBeInTheDocument()

  expect(
    (screen.getByTestId('todo-item-complete-check') as HTMLInputElement).checked
  ).toBe(false)
  expect(screen.getByTestId('todo-body-text')).toHaveTextContent('cut tomato')
  expect(
    (screen.getByTestId('todo-edit-input') as HTMLInputElement).value
  ).toBe('cut tomato')
})

test('should set css classes correctly', () => {
  const handleEditItem = jest.fn()
  const handleToggleItem = jest.fn()
  const removeItem = jest.fn()

  render(
    <Item
      todo={todo}
      editItem={handleEditItem}
      toggleItem={handleToggleItem}
      removeItem={removeItem}
    />
  )

  // when not.completed & not.onEdit, SwitchStyle doesn't show .completed .editting selectors
  expect(screen.getByTestId('todo-item')).not.toHaveClass('completed')
  expect(screen.getByTestId('todo-item')).not.toHaveClass('editing')
})

test('should work todo completed checkbox', () => {
  const handleEditItem = jest.fn()
  const handleToggleItem = jest.fn()
  const removeItem = jest.fn()

  render(
    <Item
      todo={todo}
      editItem={handleEditItem}
      toggleItem={handleToggleItem}
      removeItem={removeItem}
    />
  )

  // click complete checkbox then should appear completed class
  fireEvent.click(screen.getByTestId('todo-item-complete-check'))
  expect(handleToggleItem).toBeCalledTimes(1)
})

test('should work edit mode and toggle show/hide', () => {
  const handleEditItem = jest.fn()
  const handleToggleItem = jest.fn()
  const removeItem = jest.fn()

  render(
    <Item
      todo={todo}
      editItem={handleEditItem}
      toggleItem={handleToggleItem}
      removeItem={removeItem}
    />
  )

  // by default, edit input form is not visible
  expect(screen.getByTestId('todo-edit-input')).not.toBeVisible()
  // double click todo text label, then focus and enable todo text edit code
  fireEvent.doubleClick(screen.getByTestId('todo-body-text'))
  expect(screen.getByTestId('todo-item')).toHaveClass('editing')
  expect(screen.getByTestId('todo-edit-input')).toBeVisible()
  expect(screen.getByTestId('todo-edit-input')).toHaveFocus()
  fireEvent.change(screen.getByTestId('todo-edit-input'), {
    target: { value: 'cut tomato plus' },
  })
  fireEvent.keyPress(screen.getByTestId('todo-edit-input'), {
    key: 'Enter',
    code: 13,
    charCode: 13, // I had issue that doesn't trigger keyPress event relevant charCode. https://github.com/testing-library/react-testing-library/issues/269
  })

  expect(handleEditItem).toBeCalledWith(todo.id, 'cut tomato plus')
  expect(screen.getByTestId('todo-item')).not.toHaveClass('editing')
  expect(screen.getByTestId('todo-edit-input')).not.toBeVisible()
})

test('delete todo item', () => {
  const handleEditItem = jest.fn()
  const handleToggleItem = jest.fn()
  const removeItem = jest.fn()

  render(
    <Item
      todo={todo}
      editItem={handleEditItem}
      toggleItem={handleToggleItem}
      removeItem={removeItem}
    />
  )

  // click delete button, then todo item is removed
  expect(screen.getByTestId('todo-item')).toBeInTheDocument()
  fireEvent.click(screen.getByTestId('delete-todo-btn'))
  expect(removeItem).toBeCalledTimes(1)
})
