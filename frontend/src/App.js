import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { tokenLoader } from './util/auth';
import ErrorPage from './pages/Error';
import RootLayout from './pages/Root';
import HomePage from './pages/Home';
import LoginPage, { action as authAction } from './pages/Login';
import { logoutAction } from './pages/Logout';
import TestPage from './pages/Test';

const router = createBrowserRouter([
  { path: '/', element: <RootLayout />, errorElement: <ErrorPage />, id: 'root', loader: tokenLoader, children: [
    { index: true, element: <HomePage /> },
    { path: '/login', element: <LoginPage />, action: authAction },
    { path: '/logout', action: logoutAction },
    { path: '/test', element: <TestPage /> }
  ] }
])

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App;
