import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import TodoList from './index'
import { Todo } from '../../../dataStructure'

const todoList: Todo[] = [
  {
    id: 'TsHx9eEN5Y4A',
    bodyText: 'monster',
    completed: false,
  },
  {
    id: 'ba91OwrK0Dt8',
    bodyText: 'boss black',
    completed: false,
  },
  {
    id: 'QwejYipEf5nk',
    bodyText: 'caffe latte',
    completed: false,
  },
]

test('should be render 3 todo items in initialAppState', () => {
  render(<TodoList todoList={todoList} changeTodoList={jest.fn()} path="/" />)

  expect(screen.getByTestId('todo-list')).toBeInTheDocument()
  expect(screen.getByTestId('todo-list').children.length).toBe(3)
  expect(Array.isArray(screen.getAllByTestId('todo-item'))).toBe(true)
  expect(screen.getAllByTestId('todo-item')[0]).toHaveTextContent('monster')
  expect(screen.getAllByTestId('todo-item')[1]).toHaveTextContent('boss black')
  expect(screen.getAllByTestId('todo-item')[2]).toHaveTextContent('caffe latte')
})

test('should be work delete todo button', () => {
  const handleChangeTodoList = jest.fn()
  render(
    <TodoList
      todoList={todoList}
      changeTodoList={handleChangeTodoList}
      path="/"
    />
  )

  // delete first item
  fireEvent.click(screen.getAllByTestId('delete-todo-btn')[0])
  // assertions
  expect(handleChangeTodoList).toBeCalledWith([todoList[1], todoList[2]])
})

test('should be work correctly all completed:true|false checkbox toggle button', () => {
  const handleChangeTodoList = jest.fn()
  render(
    <TodoList
      todoList={todoList}
      changeTodoList={handleChangeTodoList}
      path="/"
    />
  )

  // delete first item
  fireEvent.click(screen.getByTestId('toggle-all-btn'))
  // should be completed all todo items
  ;(handleChangeTodoList.mock.calls[0][0] as Todo[]).forEach((todo: Todo) => {
    expect(todo.completed).toBe(true)
  })
  // toggle off
  fireEvent.click(screen.getByTestId('toggle-all-btn'))
  // should be not comleted all todo items
  ;(handleChangeTodoList.mock.calls[1][0] as Todo[]).forEach((todo: Todo) => {
    expect(todo.completed).toBe(false)
  })
})
