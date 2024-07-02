import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import HomePage from './pages/HomePage.jsx';
import Root from './Foundation/Root.jsx';
import ErrorPage from './Foundation/ErrorPage.jsx';
import WraperContext from './Context-API/WraperContext.jsx';
import PrivateRoute from './PrivateRoute.jsx/PrivateRoute.jsx';
import Login from './pages/Login.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element:(<PrivateRoute><HomePage /></PrivateRoute> ),
      },
      {
        path: "/login",
        element:<Login />,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WraperContext>

        <RouterProvider router={router} />
    </WraperContext>
  </React.StrictMode>,
)
