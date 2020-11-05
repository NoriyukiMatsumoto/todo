import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import UnderBar from './index'
import { Todo } from '../../../dataStructure'

const todoList = (): Todo[] => {
  return [
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
}
describe('todoのcompleted数に応じて、描画が変化する', () => {
  test('completed: 0, uncompleted: 3', () => {
    render(
      <UnderBar todoList={todoList()} clearCompleted={jest.fn()} path="/" />
    )
    expect(screen.getByText('3')).toBeInTheDocument()
    expect(screen.queryByText('Clear completed')).toBeNull()
  })
  test('completed: 1, uncompleted: 2', () => {
    const oneCompletedTodoList = todoList()
    oneCompletedTodoList[0].completed = true
    render(
      <UnderBar
        todoList={oneCompletedTodoList}
        clearCompleted={jest.fn()}
        path="/"
      />
    )
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('Clear completed')).toBeInTheDocument()
  })
  test('completed: 2, uncompleted: 1', () => {
    const twoCompletedTodoList = todoList()
    twoCompletedTodoList[0].completed = true
    twoCompletedTodoList[1].completed = true
    render(
      <UnderBar
        todoList={twoCompletedTodoList}
        clearCompleted={jest.fn()}
        path="/"
      />
    )
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('Clear completed')).toBeInTheDocument()
  })
  test('completed: 3, uncompleted: 3', () => {
    const threeCompletedTodoList = todoList()
    threeCompletedTodoList[0].completed = true
    threeCompletedTodoList[1].completed = true
    threeCompletedTodoList[2].completed = true
    render(
      <UnderBar
        todoList={threeCompletedTodoList}
        clearCompleted={jest.fn()}
        path="/"
      />
    )
    expect(screen.getByText('0')).toBeInTheDocument()
    expect(screen.getByText('Clear completed')).toBeInTheDocument()
  })
})

describe('handleOnClick機能テスト', () => {
  test('completeがfalseのtodoのみ返す', () => {
    const handleClearCompleted = jest.fn()
    const oneCompletedTodoList = todoList()
    oneCompletedTodoList[0].completed = true
    render(
      <UnderBar
        todoList={oneCompletedTodoList}
        clearCompleted={handleClearCompleted}
        path="/"
      />
    )

    fireEvent.click(screen.getByText('Clear completed'))
    expect(handleClearCompleted.mock.calls[0][0]).toStrictEqual([
      { ...oneCompletedTodoList[1] },
      { ...oneCompletedTodoList[2] },
    ])
  })
})
