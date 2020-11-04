import React from 'react'
import FilterLink from '../../Molecules/FilterLink'
import { Layout } from './style'
import { Routes, Todo } from '../../../dataStructure'

interface Props {
  todoList: Todo[]
  clearCompleted: (todoList: Todo[]) => void
  path: Routes
}

const UnderBar: React.FC<Props> = ({
  todoList,
  clearCompleted,
  path,
}: Props) => {
  const doneCount: number = todoList.filter(t => t.completed === true).length /* eslint-disable-line prettier/prettier */
  const yetCount: number = todoList.filter(t => t.completed === false).length /* eslint-disable-line prettier/prettier */

  const handleOnClick = () => {
    clearCompleted(todoList.filter((t: Todo) => !t.completed))
  }

  return (
    <Layout>
      <footer className="footer">
        <span className="todo-count">
          <strong data-cy="remaining-uncompleted-todo-count">{yetCount}</strong>{' '}
          item left
        </span>
        <FilterLink path={path} />

        {doneCount > 0 && (
          <button
            onClick={handleOnClick}
            className="clear-completed"
            data-cy="clear-completed-button"
          >
            Clear completed
          </button>
        )}
      </footer>
    </Layout>
  )
}

export default UnderBar
