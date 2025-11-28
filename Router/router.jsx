import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Sign";
import NoteFound from "../pages/notefound";
import Layaout from "../layaout/layaout";
import Dashboard from "../DashBoard/dashboard";
import {  createHashRouter } from 'react-router-dom';
//import { createBrowserRouter } from "react-router-dom";

// import UserList from '../src/components/Users/UserList'
// import StudentsPage from '../DashBoard/components/Students'

export const router = createHashRouter([
  {
    element: <Layaout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },

      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },

      {
        path: "*",
        element: <NoteFound />,
      },
    ],
  },
]);
