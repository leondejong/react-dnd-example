import React, { createContext, useContext, useReducer } from 'react'

export const StateContext = createContext()

export const StateProvider = ({ reducer, state, children }) => (
  <StateContext.Provider value={useReducer(reducer, state)}>
    {children}
  </StateContext.Provider>
)

export const useStateReducer = () => useContext(StateContext)
