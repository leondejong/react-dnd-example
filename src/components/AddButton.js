import styled from 'styled-components'

import IconButton from './IconButton'

const AddButton = styled(IconButton)`
  position: absolute;
  top: 0.75rem;
  right: 2rem;
  &::after {
    content: '+';
    font-size: 1.1rem;
  }
`

export default AddButton
