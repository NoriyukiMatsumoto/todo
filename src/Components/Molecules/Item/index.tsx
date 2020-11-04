import React, { useState, createRef, useEffect } from 'react'
import { Layout } from './style'
import { Todo } from '../../../dataStructure'

interface Props {
  todo: Todo
  editItem: (id: Todo['id'], bodyText: string) => void
  toggleItem: (id: Todo['id']) => void
  removeItem: (id: Todo['id']) => void
}

interface State {
  onEdit: boolean
}

const Item: React.FC<Props> = ({ todo, editItem, toggleItem, removeItem }) => {
  const editInput = createRef<HTMLInputElement>()
  const init: State = { onEdit: false }
  const [state, setState] = useState(init)

  const onDoubleClick = (): void => {
    setState({ onEdit: true })
  }

  const onBlurEdit = (e: React.FocusEvent<HTMLInputElement>): void => {
    if (e.currentTarget.value.trim().length > 0) {
      setState({ onEdit: false })
    } else {
      removeItem(todo.id)
    }
  }

  const submitEditText = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter' || e.key === 'Escape') {
      if (e.currentTarget.value.trim().length > 0) {
        setState({ onEdit: false })
      }
    }
  }

  // Control Todo's CSS based on complex user interaction
  const SwitchStyle = (t: Todo, onEdit: boolean): string => {
    switch (true) {
      case onEdit && t.completed:
        return 'completed editing'
      case onEdit && !t.completed:
        return 'editing'
      case !onEdit && t.completed:
        return 'completed'
      case !onEdit && !t.completed:
        return ''

      default:
        return ''
    }
  }

  const handleOnClickToggle = (id: Todo['id']): void => {
    toggleItem(id)
  }

  const handleOnClickDestroy = (id: Todo['id']): void => {
    removeItem(id)
  }

  const handleTodoTextEdit = (id: Todo['id'],e: React.ChangeEvent<HTMLInputElement>): void => { /* eslint-disable-line prettier/prettier */
    editItem(id, e.target.value)
  }

  useEffect(() => {
    // For fucus input element when double clicks text label. fix this https://github.com/laststance/create-react-app-typescript-todo-example-2020/issues/50
    if (state.onEdit === true && editInput.current !== null)
      editInput.current.focus()
  }, [editInput, state.onEdit])

  return (
    <Layout data-cy="todo-item">
      <li className={SwitchStyle(todo, state.onEdit)} data-testid="todo-item">
        <div className="view" data-testid="view">
          <input
            className="toggle"
            type="checkbox"
            checked={todo.completed}
            onChange={() => handleOnClickToggle(todo.id)}
            data-cy="todo-item-complete-check"
            data-testid="todo-item-complete-check"
          />
          <label
            onDoubleClick={onDoubleClick}
            data-cy="todo-body-text"
            data-testid="todo-body-text"
          >
            {todo.bodyText}
          </label>
          <button
            className="destroy"
            onClick={() => handleOnClickDestroy(todo.id)}
            data-cy="delete-todo-btn"
            data-testid="delete-todo-btn"
          />
        </div>
        <input
          ref={editInput}
          onBlur={(e: React.FocusEvent<HTMLInputElement>) => onBlurEdit(e)}
          className="edit"
          value={todo.bodyText}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleTodoTextEdit(todo.id,e)} /* eslint-disable-line prettier/prettier */
          onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => submitEditText(e)} /* eslint-disable-line prettier/prettier */
          data-cy="todo-edit-input"
          data-testid="todo-edit-input"
        />
      </li>
    </Layout>
  )
}

export default Item
