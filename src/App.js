import React from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import styled from 'styled-components'

import {
  StateProvider,
  reducer,
  isObject,
  example as exampleState
} from './state'
import Overview from './overview'

const key = 'board'

const persistedState = JSON.parse(window.localStorage.getItem(key))

export const persistedReducer = (state, action) => {
  const modifiedState = reducer(state, action)
  window.localStorage.setItem(key, JSON.stringify(modifiedState))
  return modifiedState
}

const Application = styled.div`
  height: 100%;
  padding: 1rem;
`

const App = () => (
  <StateProvider
    state={isObject(persistedState) ? persistedState : exampleState}
    reducer={persistedReducer}
  >
    <DndProvider backend={HTML5Backend}>
      <Application>
        <Overview />
      </Application>
    </DndProvider>
  </StateProvider>
)

export default App
