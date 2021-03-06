import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from '@reach/router'
import { RecoilRoot } from 'recoil'
import './index.css'
import * as serviceWorker from './serviceWorker'
import Todos from './Pages/Todos'
import ErrorBoundary from './Pages/ErrorBoundary'
import NotFound from './Pages/NotFound'
import { Routes } from './dataStructure'

interface Props {
  path: Routes
}
const Controller: React.FC<Props> = ({ path }) => <Todos path={path} />

ReactDOM.render(
  <ErrorBoundary>
    <RecoilRoot>
      <Router>
        <Controller path="/" />
        <Controller path="/active" />
        <Controller path="/completed" />
        <NotFound default />
      </Router>
    </RecoilRoot>
  </ErrorBoundary>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register()
