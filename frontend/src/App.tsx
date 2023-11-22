import React from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Dashboard, MyTask, Activity, Team, Message, Setting, ErrorPage } from './IndexForImport';
import LoginPage from './pages/login/Login';
import ForgotPassword from './pages/forgotPassword/ForgotPassword';
import ResetPassword from './pages/resetPassword/ResetPassword';
import SignUp from './pages/signup/Signup';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Dashboard />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <UnderConstruction />,
      },
      {
        path: '/project',
        element: <ProjectList />,
      },
      { path: '/project/:id', element: <ProjectView /> },
      {
        path: '/mytask',
        element: <MyTask />,
      },
      {
        path: '/activity',
        element: <Activity />,
      },
      {
        path: '/team',
        element: <Team />,
      },
      {
        path: '/message',
        element: <Message />,
      },
      {
        path: '/setting',
        element: <Setting />,
      },
    ],
  },
  {
    path: '/sign-up',
    element: <SignUp />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />,
  },
  {
    path: '/reset-password',
    element: <ResetPassword />,
  },
]);

function App() {
  return (
    <div className='App'>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
