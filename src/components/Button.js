import styled, { css } from 'styled-components'

const style = css`
  display: inline-block;
  margin: 0rem;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  background: transparent;
  text-align: center;
  font-size: 1rem;
  font-weight: 700;
  z-index: 1;
  outline: none;
  cursor: pointer;
  color: ${({ color }) => color || 'rgba(255, 255, 255, 1)'};
  border: ${({ background }) =>
    `0.125rem solid ${background || 'rgba(0, 127, 255, 1)'}`};
  &:hover {
    background: ${({ background }) => background || 'rgba(0, 127, 255, 1)'};
  }
  &:disabled {
    pointer-events: none;
    opacity: 0.5;
  }
`

const Button = styled.button`
  ${style}
`

const LinkButton = styled.a`
  ${style}
  text-decoration: none;
`

export { Button, LinkButton }
