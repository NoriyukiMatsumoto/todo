import React from 'react'
import NotFound from '.'
import '../../../index.css'

const meta = {
  title: 'Templates/NotFound',
  component: NotFound,
}

export default meta

export const notFound: React.FC = () => {
  return <NotFound />
}
