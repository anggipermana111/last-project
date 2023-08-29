import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// Import untuk melakukan router di react
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
// Import untuk mengakses fasilitas login dengan google
import { GoogleOAuthProvider } from '@react-oauth/google';
import Home from './pages/Home.jsx';
import Main from './pages/Main.jsx';
import Login from './pages/Login.jsx';
import Regisster from './pages/Register.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import Movie from './pages/Movie.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import Seat from './pages/Seat.jsx';
import CheckOut from './pages/CheckOut.jsx';

// Deklarasi variabel router
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // halaman ketika router / endpoint tidak ditemukan
    errorElement: <ErrorPage/>,
    children: [
      {
        path: "/",
        element: <Main/>,
        children: [
          {
            path: "/",
            element: <Home/>
          },
          {
            path: "/about",
            element: <About/>
          },
          {
            path: "/contact",
            element: <Contact/>
          },
          {
            path: "/movie/:id",
            element: <Movie/>
          },
          {
            path: "/seat/:id",
            element: <Seat/>
          },
          {
            path: "/checkout",
            element: <CheckOut/>
          }
        ]
      },
      {
        path: "/login",
        element: <Login/>
      },
      {
        path: "/register",
        element: <Regisster/>
      }
    ]
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* GoogleOAuthProvider membungkus semua project react */}
    <GoogleOAuthProvider clientId="969189430453-a7j0ijc74eousaep0e5l69g6dt6n1t6l.apps.googleusercontent.com">
      {/* Halaman yang di render sesuai dengan router / endpoint */}
      <RouterProvider router={router} />
      {/* <ErrorPage/> */}
    </GoogleOAuthProvider>
  </React.StrictMode>,
)
