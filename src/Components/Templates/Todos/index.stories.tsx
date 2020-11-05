import React from 'react'
import Todos, { Props } from '.'
import '../../../index.css'
import { Todo } from '../../../dataStructure'

const meta = {
  title: 'Templates/Todos',
  component: Todos,
}

export default meta

const todoList: Todo[] = [
  {
    id: 'TsHx9eEN5Y4A',
    bodyText: 'monster',
    completed: true,
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

export const todos: React.FC<Props> = () => {
  return (
    <Todos
      path="/"
      todoList={todoList}
      addTodo={() => {}}
      changeTodoList={() => {}}
    />
  )
}

export const noneTodos: React.FC<Props> = () => {
  return (
    <Todos
      path="/"
      todoList={[]}
      addTodo={() => {}}
      changeTodoList={() => {}}
    />
  )
}
