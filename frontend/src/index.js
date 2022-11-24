import React from 'react'
import ReactDOM from 'react-dom'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import './index.css'
import App from './App'

const router = createBrowserRouter([
  {
    path: '*',
    element: <App />,
  },
])

ReactDOM.render(
  <RouterProvider router={router} />,
  document.getElementById('root')
)
