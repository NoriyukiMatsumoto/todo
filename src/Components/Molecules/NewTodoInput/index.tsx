import React, { createRef } from 'react'
import { UUID } from '../../../functions'

import { Todo } from '../../../dataStructure'
import styled from 'styled-components'

export type Props = {
  submitTodoList: (todoList: Todo) => void
}

const NewTodoTextInput: React.FC<Props> = ({ submitTodoList }: Props) => {
  const textInput: React.RefObject<HTMLInputElement> = createRef<
    HTMLInputElement
  >()

  const handleOnKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (textInput.current === null) return
    if (e.key === 'Enter' && textInput.current.value.trim().length > 0) {
      // make new TODO object
      const todo: Todo = {
        id: UUID(),
        bodyText: textInput.current.value,
        completed: false,
      }

      // add new TODO to entire TodoList
      submitTodoList(todo)

      // reset text input UI value
      textInput.current.value = ''
    }
  }

  return (
    <header className="header">
      <H1>todes</H1>
      <NewTodoInput
        type="text"
        className="new-todo"
        placeholder="What needs to be done?"
        ref={textInput}
        onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) =>
          handleOnKeyPress(e)
        }
        autoFocus
        data-testid="new-todo-input-text"
        data-cy="new-todo-input-text"
      />
    </header>
  )
}
const H1 = styled.h1`
  position: absolute;
  top: -155px;
  width: 100%;
  font-size: 100px;
  font-weight: 100;
  text-align: center;
  color: rgba(175, 47, 47, 0.15);
  -webkit-text-rendering: optimizeLegibility;
  -moz-text-rendering: optimizeLegibility;
  text-rendering: optimizeLegibility;
`
const NewTodoInput = styled.input`
  position: relative;
  margin: 0;
  width: 100%;
  font-size: 24px;
  font-family: inherit;
  font-weight: inherit;
  line-height: 1.4em;
  color: inherit;
  padding: 6px;
  border: 1px solid #999;
  box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding: 16px 16px 16px 60px;
  border: none;
  background: rgba(0, 0, 0, 0.003);
  box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
`

export default NewTodoTextInput
