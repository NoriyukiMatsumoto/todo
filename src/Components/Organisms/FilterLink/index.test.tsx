import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import FilterLink from './index'

test('<FilterLink /> should render All', () => {
  const screen = render(<FilterLink path={"/"} />)
  expect(screen.getByText(/All/)).toHaveClass('selected')
  expect(screen.getByText(/Active/)).not.toHaveClass('selected')
  expect(screen.getByText(/Completed/)).not.toHaveClass('selected')
})

test('<FilterLink /> should render Active', () => {
  const screen = render(<FilterLink path={'/active'} />)
  expect(screen.getByText(/All/)).not.toHaveClass('selected')
  expect(screen.getByText(/Active/)).toHaveClass('selected')
  expect(screen.getByText(/Completed/)).not.toHaveClass('selected')
})

test('<FilterLink /> should render Completed', () => {
  const screen = render(<FilterLink path={'/completed'} />)
  expect(screen.getByText(/All/)).not.toHaveClass('selected')
  expect(screen.getByText(/Active/)).not.toHaveClass('selected')
  expect(screen.getByText(/Completed/)).toHaveClass('selected')
})