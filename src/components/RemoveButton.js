import styled from 'styled-components'

import IconButton from './IconButton'

const RemoveButton = styled(IconButton)`
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  &::after {
    content: '✕';
    font-size: 0.625rem;
    font-weight: 700;
  }
`

export default RemoveButton
