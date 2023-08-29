import React from 'react'
import { useContext } from 'react'
import { AllContext } from '../App'

export default function ComponentProtected() {
    const {token} = useContext(AllContext)
  return (
    <>
        {/* {
            token?
        } */}
    </>
  )
}
