import React from 'react'
import { Link } from '@reach/router'
import { Routes } from '../../../dataStructure'
import styled from 'styled-components'

interface Props {
  path: Routes
}

const FilterLink: React.FC<Props> = ({ path }) => {
  return (
    <Ul className="filters">
      <Li>
        <Link
          data-cy="all-filter"
          className={path === '/' ? 'selected' : ''}
          to="/"
        >
          All
        </Link>
      </Li>
      <Li>
        <Link
          data-cy="active-filter"
          className={path === '/active' ? 'selected' : ''}
          to="/active"
        >
          Active
        </Link>
      </Li>
      <Li>
        <Link
          data-cy="completed-filter"
          className={path === '/completed' ? 'selected' : ''}
          to="/completed"
        >
          Completed
        </Link>
      </Li>
    </Ul>
  )
}

const Ul = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  position: absolute;
  right: 0;
  left: 0;
`

const Li = styled.li`
  display: inline;

  a {
    color: inherit;
    margin: 3px;
    padding: 3px 7px;
    text-decoration: none;
    border: 1px solid transparent;
    border-radius: 3px;
  }

  a:hover {
    border-color: rgba(175, 47, 47, 0.1);
  }

  a.selected {
    border-color: rgba(175, 47, 47, 0.2);
  }
`

export default FilterLink
