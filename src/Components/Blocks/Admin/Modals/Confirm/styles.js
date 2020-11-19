import styled from 'styled-components'
import { themeGet } from 'styled-system'

const ConfirmModal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  h2 {
    width: 100%;
  }
  @media screen and (min-width: ${themeGet('breakpoints.1')}) {
    min-width: 480px;
    min-height: 208px;
  }
`
export default ConfirmModal
