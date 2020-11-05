import React from 'react'
import Todos, { Props } from '.'
import '../../../index.css'
import { Todo } from '../../../dataStructure'
import { Story } from '@storybook/react'

const meta = {
  title: 'Templates/Todos',
  component: Todos,
}

export default meta

const todoList = (): Todo[] => {
  return [
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
}

const Template: Story<Props> = (args: Props) => <Todos {...args} />
export const todosAll = Template.bind({})
todosAll.args = {
  path: '/',
  todoList: todoList(),
  addTodo: () => {},
  changeTodoList: () => {},
}

export const todosActive = Template.bind({})
todosActive.args = {
  path: '/active',
  todoList: todoList(),
  addTodo: () => {},
  changeTodoList: () => {},
}

export const todosComplete = Template.bind({})
todosComplete.args = {
  path: '/completed',
  todoList: todoList(),
  addTodo: () => {},
  changeTodoList: () => {},
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
