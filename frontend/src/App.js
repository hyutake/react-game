import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import ErrorPage from './pages/Error';
import RootLayout from './pages/Root';
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import TestPage from './pages/Test';

const router = createBrowserRouter([
  { path: '/', element: <RootLayout />, errorElement: <ErrorPage />, children: [
    { index: true, element: <HomePage />},
    { path: '/login', element: <LoginPage /> },
    { path: '/test', element: <TestPage /> }
  ] }
])

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App;
