import { Outlet } from 'react-router-dom'
import { createContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
// import { useRef } from 'react';

export const AllContext = createContext({})

export default function App() {
  const [movies, setMovies] = useState([]);
  // const tema = useRef("dark")
  const [theme, setTheme] = useState("dark");
  const [burger, setBurger] = useState(false)
  const [select, setSelect] = useState(0)

  useEffect(() => {
    fetch(`http://localhost:8080/api/schedule/get-film`)
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.Response)
      });
  }, []);

  return (
    <AllContext.Provider value={{theme, setTheme, burger, setBurger, select, setSelect, movies}}>
      <Outlet/>
    </AllContext.Provider>
  )
}