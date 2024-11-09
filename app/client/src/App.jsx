import React from 'react'
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
// import CheckIfLoggedIn from './components/CheckIfLoggedIn/CheckIfLoggedIn';
// import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import store from './store'
import router from './router'

function App() {

  return (
    <Provider store={store} stabilityCheck="never">
      <RouterProvider router={router} />
    </Provider>
  )
}

export default App
