import React from 'react'
import styled from 'styled-components'

import Category from './Category'

import { useStateReducer, occupiedArray, fill } from '../state'
import { ContentEditable, NewButton, ClearButton } from '../components'

const Header = styled.header`
  margin: 0.5rem;
`

const Footer = styled.footer`
  display: flex;
  padding: 1rem 0.5rem 0.25rem;
  text-align: left;
`

const Main = styled.main`
  flex: 1;
  display: flex;
  width: 100%;
  min-height: 67%;
`

const Title = styled.h1`
  margin: 0 0 1rem 0;
  font-size: 4rem;
  border-radius: 0.5rem;
  outline: none;
  &:focus {
    background: rgba(255, 255, 255, 0.15);
  }
`

export default () => {
  const [{ entities, structure, name }, dispatch] = useStateReducer()

  const data = fill(structure, entities)

  function updateTitle (name) {
    dispatch({
      type: 'title',
      name
    })
  }

  function newCategory () {
    dispatch({
      type: 'new',
      target: data.id,
      entity: { name: 'New' }
    })
  }

  function clearAll () {
    if (window.confirm('Are you sure you want to clear the whole board?')) {
      dispatch({ type: 'clear' })
    }
  }

  function content () {
    if (occupiedArray(data.nodes)) {
      return data.nodes.map(entity => (
        <Category key={entity.id} data={entity} />
      ))
    } else {
      return <NewButton title='Add category' onClick={newCategory} />
    }
  }

  return (
    <>
      <Header>
        <ContentEditable
          tag={Title}
          onInput={e => updateTitle(e.target.innerHTML)}
        >
          {name}
        </ContentEditable>
        <ClearButton title='Clear whole board' onClick={clearAll} />
      </Header>
      <Main>{content()}</Main>
      <Footer />
    </>
  )
}
