import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { RouteComponentProps } from '@reach/router'
import TodoTemplate from '../../Components/Templates/Todos'
import {
  AppState,
  recoilState,
  LocalStorageKey,
  Routes,
  Todo,
} from '../../dataStructure'

interface Props {
  path: Routes
}

const App: React.FC<Props & RouteComponentProps> = ({ path }) => {
  const [appState, setAppState] = useRecoilState<AppState>(recoilState)

  // if appState has changes, save it LocalStorage.
  useEffect((): void => {
    window.localStorage.setItem(
      LocalStorageKey.APP_STATE,
      JSON.stringify(appState) // convert JavaScript Object to string
    )
  }, [appState])

  const addTodo = (todo: Todo) => {
    setAppState({ todoList: [todo, ...appState.todoList] })
  }

  const changeTodoList = (todoList: Todo[]) => {
    setAppState({ todoList: todoList })
  }

  return (
    <TodoTemplate
      path={path}
      todoList={appState.todoList}
      addTodo={addTodo}
      changeTodoList={changeTodoList}
    />
  )
}

export default App
