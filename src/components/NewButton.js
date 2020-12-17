import styled from 'styled-components'

import IconButton from './IconButton'

const NewButton = styled(IconButton)`
  position: relative;
  width: 2rem;
  height: 2rem;
  margin: 0.5rem;
  &::after {
    content: '+';
    font-size: 2rem;
    color: rgba(63, 63, 63, 1);
  }
`

export default NewButton
