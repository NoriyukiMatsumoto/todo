import React, { ReactElement } from 'react'
import Item from '../../Molecules/Item'
import { Layout } from './style'
import { Routes, Todo } from '../../../dataStructure'

interface Props {
  todoList: Todo[]
  changeTodoList: (todoList: Todo[]) => void
  path: Routes
}

const TodoList: React.FC<Props> = ({ todoList, changeTodoList, path }) => {
  const handleToggleAll = (e: React.ChangeEvent<HTMLInputElement>): void => {
    changeTodoList(
      todoList
        .slice()
        .map((t: Todo): Todo => ({ ...t, completed: e.target.checked }))
    )
  }

  const handleRemoveItem = (id: Todo['id']) => {
    const removedList: Todo[] = todoList.filter(
      (t: Todo): boolean => t.id !== id
    )
    changeTodoList(removedList)
  }

  const handleEditItem = (id: Todo['id'], bodyText: string) => {
    const editedList = todoList.map(
      (t: Todo): Todo => {
        if (t.id === id) {
          return { ...t, bodyText: bodyText }
        } else {
          return t
        }
      }
    )
    changeTodoList(editedList)
  }

  const handleToggleItem = (id: Todo['id']) => {
    const toggledList: Todo[] = todoList.map((t) => {
      // search clicked item by id...
      if (t.id === id) {
        // change complated status only clicked item
        return { ...t, completed: !t.completed }
        // return other item without any changes
      } else {
        return t
      }
    })
    changeTodoList(toggledList)
  }

  return (
    <Layout>
      <section className="main">
        <input
          id="toggle-all"
          className="toggle-all"
          type="checkbox"
          onChange={handleToggleAll}
          data-cy="toggle-all-btn"
          data-testid="toggle-all-btn"
        />
        <label htmlFor="toggle-all">Mark all as complete</label>
        <ul className="todo-list" data-testid="todo-list">
          {todoList
            .filter((t: Todo): boolean => {
              switch (path) {
                case '/':
                  return true
                case '/active':
                  return t.completed === false
                case '/completed':
                  return t.completed === true
                default:
                  return true
              }
            })
            .map(
              (t: Todo): ReactElement => {
                return (
                  <Item
                    key={t.id}
                    todo={t}
                    removeItem={handleRemoveItem}
                    toggleItem={handleToggleItem}
                    editItem={handleEditItem}
                  />
                )
              }
            )}
        </ul>
      </section>
    </Layout>
  )
}

export default TodoList
