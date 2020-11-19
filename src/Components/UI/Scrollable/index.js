import styled from 'styled-components'
import { Box } from 'rebass'
import { width, height, maxHeight } from 'styled-system'

import { themeGet } from '@styled-system/theme-get'

const Scrollable = styled(Box)`
  border: none;
  flex-grow: 1;
  overflow-y: auto;
  background-color: ${props => themeGet(`colors.${props.color || 'white'}`)};

  ::-webkit-scrollbar {
    width: 6px;
    background-color: ${themeGet('colors.white')};
  }

  ::-webkit-scrollbar-thumb {
    margin: 2px;
    border-radius: 3px;;
    background-color: ${themeGet('colors.lock')};
  }

  ${width}
  ${height}
  ${maxHeight}
`

export default Scrollable
