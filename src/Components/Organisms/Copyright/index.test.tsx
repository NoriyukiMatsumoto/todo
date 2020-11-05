import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import CopyLight from './index'
import { Todo } from '../../../dataStructure'

test('<CopyLight /> should render', () => {
  const screen = render(<CopyLight />)
  expect(screen.getByText(/Created by/)).toBeInTheDocument()
})