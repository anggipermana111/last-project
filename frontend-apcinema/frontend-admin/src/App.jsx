import { Outlet } from "react-router-dom";
import React, { useState } from 'react';
import { createContext } from "react";

export const AllContext = createContext({})

export default function App() {
  const [token, setToken] = useState()

  return (
    <AllContext.Provider value={{token, setToken}}>
      <Outlet/>
    </AllContext.Provider>
  )
}