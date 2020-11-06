import React from 'react'
import { fireEvent, screen, render } from '@testing-library/react'
import NewTodoTextInput from './index'

describe('renderのテスト', () => {
  test('should be render <NewTodoTextInput/>', () => {
    const handleSubmitTodoList = jest.fn()
    render(<NewTodoTextInput submitTodoList={handleSubmitTodoList} />)

    // Header text
    expect(screen.getByText('todos')).toBeInTheDocument()
    // Text input
    expect(screen.getByTestId('new-todo-input-text')).toBeInTheDocument()
  })
})

describe('submitTodoList関数のテスト', () => {
  let handleSubmitTodoList: jest.Mock<any, any> // eslint-disable-line @typescript-eslint/no-explicit-any
  beforeEach(() => {
    handleSubmitTodoList = jest.fn()
    render(<NewTodoTextInput submitTodoList={handleSubmitTodoList} />)
  })

  test('inputが空の場合、何もしない', () => {
    const input = screen.getByTestId('new-todo-input-text')

    fireEvent.change(input, { target: { value: '' } })
    fireEvent.keyPress(input, { key: 'Enter', code: 13, charCode: 13 })

    expect(handleSubmitTodoList).not.toBeCalled()
  })

  test('inputが文字がある場合、イベントを発行する', () => {
    const input = screen.getByTestId('new-todo-input-text')
    const bodyTexts = ['test', ' test', 'test ', ' test ']

    bodyTexts.forEach((bodyText, index) => {
      fireEvent.change(input, { target: { value: bodyText } })
      fireEvent.keyPress(input, { key: 'Enter', code: 13, charCode: 13 })

      expect(handleSubmitTodoList).toBeCalledTimes(index + 1)
      expect(handleSubmitTodoList.mock.calls[index][0].bodyText).toBe(bodyText)
    })
  })
})
