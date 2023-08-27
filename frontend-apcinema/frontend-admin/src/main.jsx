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
import EditFilmForm from './pages/EditFilmForm.jsx'
import StudioTable from './pages/StudioTable.jsx'
import UserTable from './pages/UserTable.jsx'
import GenreTable from './pages/GenreTable.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>error</div>,
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
            element: <EditFilmForm />
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
            path: "/genre",
            element: <GenreTable />,
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
