import React from 'react'
import { useDrag } from 'react-dnd'
import styled, { css } from 'styled-components'

import { useStateReducer } from '../state'
import {
  ContentEditable,
  ColorPalette,
  AddButton,
  RemoveButton
} from '../components'

const editable = css`
  margin: 0;
  padding: 0.25rem;
  border-radius: 0.5rem;
  outline: none;
  &:focus {
    background: rgba(255, 255, 255, 0.15);
  }
`

const Subject = styled.section`
  margin: 0.5rem;
  border-radius: 0.5rem;
  opacity: ${({ dragging }) => (dragging ? '0.5' : '1')};
  background: ${({ color }) => color || 'rgba(95, 95, 95, 1)'};
`

const Title = styled.h5`
  ${editable}
  margin: 2rem 0.5rem 0 0.5rem;
  font-size: 1.5rem;
`

const Content = styled.p`
  ${editable}
  margin: 0 0.5rem 0.5rem 0.5rem;
  font-weight: 700;
  line-height: 1.5;
`

const Handle = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 0.5rem;
  background: transparent;
  cursor: pointer;
  &::after {
    content: '';
    position: absolute;
    width: 30%;
    height: 0.0625rem;
    margin: 1rem 35% 0.5rem 35%;
    background: transparent;
    border-top: 1px solid rgba(255, 255, 255, 0.5);
    border-bottom: 3px double rgba(255, 255, 255, 0.5);
  }
`

export default ({ data, parent }) => {
  const [, dispatch] = useStateReducer()

  const [{ isDragging }, drag, preview] = useDrag({
    item: { type: 'item', item: data, parent },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  })

  function addSubject () {
    dispatch({
      type: 'add',
      target: data.id,
      entity: { name: 'New', content: '...' }
    })
  }

  function updateSubject (key, value) {
    dispatch({
      type: 'update',
      entity: { id: data.id, [key]: value }
    })
  }

  function removeSubject () {
    dispatch({
      type: 'remove',
      id: data.id
    })
  }

  return (
    <Subject ref={preview} color={data.color}>
      <Handle ref={drag} dragging={isDragging} />
      <AddButton title='Add card' onClick={addSubject} />
      <RemoveButton title='Remove card' onClick={removeSubject} />
      <ContentEditable
        tag={Title}
        onInput={e => updateSubject('name', e.target.innerHTML)}
      >
        {data.name}
      </ContentEditable>
      <ContentEditable
        tag={Content}
        onInput={e => updateSubject('content', e.target.innerHTML)}
      >
        {data.content}
      </ContentEditable>
      <ColorPalette onClick={(_, color) => updateSubject('color', color)} />
    </Subject>
  )
}
