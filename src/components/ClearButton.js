import styled from 'styled-components'

import IconButton from './IconButton'

const ClearButton = styled(IconButton)`
  position: absolute;
  top: 1rem;
  right: 0;
  width: 2rem;
  height: 2rem;
  background: transparent;
  &::after {
    content: '✕';
    font-size: 2rem;
    color: rgba(255, 255, 255, 1);
  }
  &:hover {
    &::after {
      color: rgba(255, 0, 0, 1);
    }
  }
`

export default ClearButton
