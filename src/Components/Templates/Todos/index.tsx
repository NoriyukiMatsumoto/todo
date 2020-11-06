import React from 'react'
import NewTodoInput from '../../Molecules/NewTodoInput'
import TodoList from '../../Organisms/TodoList'
import UnderBar from '../../Organisms/UnderBar'
import Copyright from '../../Organisms/Copyright'
import { Layout } from './style'
import { Routes, Todo } from '../../../dataStructure'

export interface Props {
  path: Routes
  todoList: Todo[]
  addTodo: (todo: Todo) => void
  changeTodoList: (todo: Todo[]) => void
}

const Todos: React.FC<Props> = ({
  path,
  todoList,
  addTodo,
  changeTodoList,
}) => {
  return (
    <Layout>
      <section className="todoapp">
        test
        <NewTodoInput submitTodoList={addTodo} />
        {todoList.length ? (
          <>
            <TodoList
              path={path}
              todoList={todoList}
              changeTodoList={changeTodoList}
            />
            <UnderBar
              path={path}
              todoList={todoList}
              clearCompleted={changeTodoList}
            />
          </>
        ) : null}
      </section>
      <Copyright />
    </Layout>
  )
}

export default Todos
