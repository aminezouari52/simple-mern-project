import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'

import store from './shared/store/store'
import './index.css'
import App from './App'

const router = createBrowserRouter([
  {
    path: '*',
    element: <App />,
  },
])

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
