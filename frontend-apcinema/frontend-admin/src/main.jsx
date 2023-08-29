import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Main from './pages/Main.jsx'
import FilmTable from './pages/FilmTable.jsx'
import FilmForm from './pages/FilmForm.jsx'
import StudioTable from './pages/StudioTable.jsx'
import UserTable from './pages/UserTable.jsx'
import GenreTable from './pages/GenreTable.jsx'
import ChairTable from './pages/ChairTable.jsx'
import FoodTable from './pages/FoodTable.jsx'
import AdminTable from './pages/AdminTable.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import GenreForm from './pages/GenreForm.jsx'
import FoodForm from './pages/FoodForm.jsx'
import UserForm from './pages/UserForm.jsx'
import AdminForm from './pages/AdminForm.jsx'
import UpdateFilmForm from './pages/UpdateFilmForm.jsx'
import ScheduleTable from './pages/ScheduleTable.jsx'
import ScheduleForm from './pages/ScheduleForm.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage/>,
    children: [
      {
        path: "/",
        element: <Main />,
        children: [
          {
            path: "/",
            element: <Dashboard />,
          },
          {
            path: "/film",
            element: <FilmTable />,
          },
          {
            path: "/add-film",
            element: <FilmForm />
          },
          {
            path: "/update-film/:id",
            element: <UpdateFilmForm />
          },
          {
            path: "/genre",
            element: <GenreTable />,
          },
          {
            path: "/add-genre",
            element: <GenreForm />,
          },
          {
            path: "/studio",
            element: <StudioTable />,
          },
          {
            path: "/user",
            element: <UserTable />,
          },
          {
            path: "/add-user",
            element: <UserForm />,
          },
          {
            path: "/kursi",
            element: <ChairTable />,
          },
          {
            path: "/food",
            element: <FoodTable />,
          },
          {
            path: "/add-food",
            element: <FoodForm />,
          },
          {
            path: "/admin",
            element: <AdminTable />,
          },
          {
            path: "/add-admin",
            element: <AdminForm />,
          },
          {
            path: "/schedule",
            element: <ScheduleTable />,
          },
          {
            path: "/add-schedule",
            element: <ScheduleForm />,
          }
        ]
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/register",
        element: <Register />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
