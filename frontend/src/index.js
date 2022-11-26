import React from 'react'
import ReactDOM from 'react-dom'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'

import store from './store/store'
import './index.css'
import App from './App'

const router = createBrowserRouter([
  {
    path: '*',
    element: <App />,
  },
])

ReactDOM.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
  document.getElementById('root')
)
