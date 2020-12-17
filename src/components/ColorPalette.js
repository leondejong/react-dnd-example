import React from 'react'
import styled from 'styled-components'

import { state } from '../state'

const { colors } = state

const Colors = styled.div`
  display: flex;
  width: 6.5rem;
  margin: 0.75rem;
  padding: 0.125rem 0.1875rem;
  border-radius: 0.5rem;
  background: rgba(31, 31, 31, 1);
  background: rgba(255, 255, 255, 1);
  opacity: 0.5;
  &:hover {
    background: rgba(31, 31, 31, 1);
    opacity: 1;
  }
`

const Color = styled.span`
  flex: 1;
  width: 0.625rem;
  height: 0.625rem;
  margin: 0.06125rem 0.125rem;
  border-radius: 0.3125rem;
  cursor: pointer;
  background: ${({ value }) => value || 'rgba(255, 255, 255, 1)'};
  border: ${({ value }) =>
    `1px solid ${value}` || '1px solid rgba(255, 255, 255, 1)'};
  &:hover {
    border: 1px solid rgba(255, 255, 255, 1);
  }
`

export default ({ onClick }) => {
  return (
    <Colors>
      {Object.values(colors).map(color => (
        <Color key={color} value={color} onClick={e => onClick(e, color)} />
      ))}
    </Colors>
  )
}
