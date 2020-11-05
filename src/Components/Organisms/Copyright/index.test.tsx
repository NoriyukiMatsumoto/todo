import React from 'react'
import { render } from '@testing-library/react'
import CopyLight from './index'

test('<CopyLight /> should render', () => {
  const screen = render(<CopyLight />)
  expect(screen.getByText(/Created by/)).toBeInTheDocument()
})
