import styled from 'styled-components'

const IconButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1rem;
  height: 1rem;
  border-radius: 0.5rem;
  background: rgba(255, 255, 255, 0.5);
  z-index: 1;
  border: none;
  outline: none;
  cursor: pointer;
  &::after {
    content: '+';
    font-family: Arial, sans-serif;
    font-size: 1rem;
    line-height: 0;
    color: rgba(0, 0, 0, 1);
  }
  &:hover {
    background: rgba(31, 31, 31, 1);
    &::after {
      color: rgba(255, 255, 255, 1);
    }
  }
  &:disabled {
    pointer-events: none;
    opacity: 0.5;
  }
`

export default IconButton
