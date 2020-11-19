import styled from 'styled-components'
import { fontWeight, textAlign, themeGet } from 'styled-system'
import { Flex, Box } from 'rebass'

const Table = styled(Flex)`
  flex-flow: column nowrap;
  justify-content: space-between;
  flex: 1 1 auto;
`

export const Row = styled(Flex).attrs({
  py: 2,
  px: 0,
  mb: 0,
  mx: -2,
})`
  flex-flow: row nowrap;
  min-height: 40px;
`

export const Column = styled(Flex).attrs({
  px: 2,
})`
  flex-flow: row nowrap;
  flex-grow: ${props => props.grow || 1};
  flex-basis: 0;
  font-size: 16px;
  align-items: center;
  word-break: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: 0px;
  white-space: nowrap;

  ${fontWeight} ${textAlign};
`

Table.Admin = styled(Box).attrs({
  as: 'table',
  width: 1,
  my: 3,
})`
  border-collapse: collapse;
  border-spacing: 0;

  thead {
    tr {
      background: ${themeGet('colors.secondary')};
      color: ${themeGet('colors.white')};
    }
  }

  tbody {
    tr {
      &:nth-child(even) {
        background-color: ${themeGet('colors.catskillWhite')};
      }
    }
  }

  th,
  td {
    padding: 4px 8px;
    margin: 0;
    text-align: left;
  }
`

export default Table
