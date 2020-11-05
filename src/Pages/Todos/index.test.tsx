import React from 'react'
import {
  Router,
  createHistory,
  createMemorySource,
  LocationProvider,
} from '@reach/router'
import { fireEvent, render, screen } from '@testing-library/react'
import { RecoilRoot } from 'recoil'
import Todos from '.'

const App = () => (
  <RecoilRoot>
    <Router>
      <Todos path="/" />
      <Todos path="/active" />
      <Todos path="/completed" />
    </Router>
  </RecoilRoot>
)

/**
 * @see https://testing-library.com/docs/example-reach-router
 */
const renderWithRouter = (
  ui: JSX.Element,
  { route = '/', history = createHistory(createMemorySource(route)) } = {}
) => {
  return {
    ...render(<LocationProvider history={history}>{ui}</LocationProvider>),
    history,
  }
}

describe('useEffect', () => {
  test('localStorage setItem', () => {
    jest.spyOn(window.localStorage.__proto__, 'setItem')
    window.localStorage.__proto__.setItem = jest.fn()

    renderWithRouter(<App />)
    expect(localStorage.setItem).toHaveBeenCalled()
  })
})

const addTodo = (input: HTMLElement, bodyText: string) => {
  fireEvent.change(input, { target: { value: bodyText } })
  fireEvent.keyPress(input, { key: 'Enter', code: 13, charCode: 13 })
}

describe('add todo', () => {
  test('todoを追加すると、リストに追加される', () => {
    renderWithRouter(<App />)
    const input = screen.getByRole('textbox')
    addTodo(input, 'one')
    addTodo(input, 'two')
    addTodo(input, 'three')

    expect(screen.getByText(/one/)).toBeInTheDocument()
    expect(screen.getByText(/two/)).toBeInTheDocument()
    expect(screen.getByText(/three/)).toBeInTheDocument()
  })
})

describe('complete todo', () => {
  test('todo itemの完了ボタンでを完了すると、Completedに追加される', async () => {
    const {
      history: { navigate },
    } = renderWithRouter(<App />)
    const input = screen.getByRole('textbox')
    addTodo(input, 'one')
    addTodo(input, 'two')
    addTodo(input, 'three')
    fireEvent.click(screen.getAllByTestId('todo-item-complete-check')[0])

    await navigate('/active')
    expect(screen.queryByText(/one/)).toBeInTheDocument()
    expect(screen.queryByText(/two/)).toBeInTheDocument()
    expect(screen.queryByText(/three/)).toBeNull()

    await navigate('/completed')
    expect(screen.queryByText(/one/)).toBeNull()
    expect(screen.queryByText(/two/)).toBeNull()
    expect(screen.queryByText(/three/)).toBeInTheDocument()
  })

  test('todoの全て完了ボタンでを完了すると、Completedに追加される', async () => {
    const {
      history: { navigate },
    } = renderWithRouter(<App />)
    const input = screen.getByRole('textbox')
    addTodo(input, 'one')
    addTodo(input, 'two')
    addTodo(input, 'three')
    fireEvent.click(screen.getByTestId('toggle-all-btn'))

    await navigate('/active')
    expect(screen.queryByText(/one/)).toBeNull()
    expect(screen.queryByText(/two/)).toBeNull()
    expect(screen.queryByText(/three/)).toBeNull()

    await navigate('/completed')
    expect(screen.queryByText(/one/)).toBeInTheDocument()
    expect(screen.queryByText(/two/)).toBeInTheDocument()
    expect(screen.queryByText(/three/)).toBeInTheDocument()
  })
})

describe('delete todo', () => {
  test('todo itemの削除ボタンでitemを削除する', () => {
    renderWithRouter(<App />)
    const input = screen.getByRole('textbox')
    addTodo(input, 'one')
    addTodo(input, 'two')
    addTodo(input, 'three')

    fireEvent.click(screen.getAllByTestId('delete-todo-btn')[0])
    fireEvent.click(screen.getAllByTestId('delete-todo-btn')[0])

    expect(screen.queryByText(/one/)).toBeInTheDocument()
    expect(screen.queryByText(/two/)).toBeNull()
    expect(screen.queryByText(/three/)).toBeNull()
  })

  test('Clear completedボタンでitemを削除する', async () => {
    renderWithRouter(<App />)
    const input = screen.getByRole('textbox')
    addTodo(input, 'one')
    addTodo(input, 'two')
    addTodo(input, 'three')

    fireEvent.click(screen.getAllByTestId('todo-item-complete-check')[0])
    fireEvent.click(screen.getAllByTestId('todo-item-complete-check')[1])
    fireEvent.click(await screen.findByText(/Clear completed/))
    expect(screen.queryByText(/one/)).toBeInTheDocument()
    expect(screen.queryByText(/two/)).toBeNull()
    expect(screen.queryByText(/three/)).toBeNull()
  })
})
