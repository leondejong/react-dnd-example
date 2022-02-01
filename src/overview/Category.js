import React, { useRef, useState } from 'react'
import { useDrop } from 'react-dnd'
import styled from 'styled-components'

import Subject from './Subject'
import { getVerticalIndex, getIndicatorTop, normalizePosition } from './utils'

import { useStateReducer, occupiedArray } from '../state'
import {
  ContentEditable,
  NewButton,
  AddButton,
  RemoveButton
} from '../components'

const Column = styled.section`
  flex: 1;
  display: flex;
  flex-direction: column;
  max-width: calc(33.333% - 1rem);
  margin: 0.5rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background: ${({ color }) => color || 'rgba(63, 63, 63, 1)'};
  border: ${({ over }) =>
    over
      ? '2px dashed rgba(255, 255, 255, 1)'
      : '2px solid rgba(63, 63, 63, 1)'};
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 8rem;
  &::after {
    position: absolute;
    z-index: 1;
    left: 0;
    width: 25%;
    height: 0;
    margin: -0.125rem 0 0 37.5%;
    border-radius: 0.25rem;
    border-top: 0.25rem solid rgba(255, 255, 255, 1);
    content: ${({ over }) => (over ? '""' : 'none')};
    top: ${({ indicator }) => `${indicator}px`};
  }
`

const Title = styled.h3`
  margin: 0.5rem 0.5rem 1rem 0.5rem;
  font-size: 2rem;
  border-radius: 0.5rem;
  outline: none;
  &:focus {
    background: rgba(255, 255, 255, 0.15);
  }
`

const Category = ({ data }) => {
  const element = useRef()
  const [indicator, setIndicator] = useState(0)
  const [, dispatch] = useStateReducer()

  const [{ isOver }, drop] = useDrop({
    accept: 'item',
    drop: ({ item, parent }, monitor) => {
      const position = getVerticalIndex(
        element?.current,
        monitor.getClientOffset()
      )
      dispatch({
        type: 'move',
        target: data.id,
        source: item.id,
        position: normalizePosition(position, parent, data, item)
      })
    },
    hover: (_, monitor) => {
      const position = getVerticalIndex(
        element?.current,
        monitor.getClientOffset()
      )
      setIndicator(getIndicatorTop(element?.current, position))
    },
    collect: monitor => ({
      isOver: monitor.isOver()
    })
  })

  function newSubject () {
    dispatch({
      type: 'new',
      target: data.id,
      entity: { name: 'New', content: '...' }
    })
  }

  function addCategory () {
    dispatch({
      type: 'add',
      target: data.id,
      entity: { name: 'New' }
    })
  }

  function updateCategory (key, value) {
    dispatch({
      type: 'update',
      entity: { id: data.id, [key]: value }
    })
  }

  function removeCategory () {
    dispatch({
      type: 'remove',
      id: data.id
    })
  }

  function content () {
    if (occupiedArray(data.nodes)) {
      return data.nodes.map(entity => (
        <Subject key={entity.id} data={entity} parent={data} />
      ))
    } else {
      return <NewButton title='Add card' onClick={newSubject} />
    }
  }

  return (
    <Column over={isOver} color={data.color}>
      <ContentEditable
        tag={Title}
        onInput={e => updateCategory('name', e.target.innerHTML)}
      >
        {data.name}
      </ContentEditable>
      <AddButton title='Add category' onClick={addCategory} />
      <RemoveButton title='Remove category' onClick={removeCategory} />
      <Content ref={drop(element)} indicator={indicator} over={isOver}>
        {content()}
      </Content>
    </Column>
  )
}

export default Category
