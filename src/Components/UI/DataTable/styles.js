import styled, { css } from 'styled-components'
import { space, themeGet, justifyContent } from 'styled-system'
import ReactTable from 'react-table'
import { Flex } from 'rebass'

import Icon from '../Icon'

export const Sortable = styled(Flex).attrs({
  ml: 1,
})``

export const IconAsc = styled(Icon)`
  transform: rotate(180deg);
  fill: ${themeGet('colors.brownGray')};
`

export const IconDesc = styled(Icon)`
  margin-left: -3px;
  margin-top: 0.5px;
  fill: ${themeGet('colors.brownGray')};
`

const paginationCss = ({ pagination = true }) =>
  !pagination &&
  css`
    .pagination-bottom {
      display: none;
    }
  `
export const DataTable = styled(ReactTable).attrs({
  mb: 4,
})`
  border: none !important;

  .rt-table {
    overflow: visible;
    min-height: 200px;

    .rt-thead {
      box-shadow: none !important;
      background: ${themeGet('colors.veryLightGray')};
      border-bottom: 1px solid ${themeGet('colors.veryLightPink')};
      padding-top: 8px;
      padding-bottom: 8px;
      font-weight: bold;

      &.-filters {
        padding: 0;

        input {
          margin: 0;
        }
      }

      .rt-th {
        border-right: none !important;

        &.-sort-desc {
          box-shadow: none !important;

          ${IconDesc} {
            fill: ${themeGet('colors.secondary')};
          }
        }

        &.-sort-asc {
          box-shadow: none !important;

          ${IconAsc} {
            fill: ${themeGet('colors.secondary')};
          }
        }
      }
    }

    .rt-tbody {
      overflow: visible;
      border-bottom: 1px solid ${themeGet('colors.lightGray')} !important;

      .rt-td {
        min-height: 42px;
        padding: 10px 5px;
        border-right: none !important;
        display: table-cell;
        vertical-align: middle;
        overflow: initial;
      }
    }
  }

  ${space};
  ${paginationCss};
`

export const HeaderCellContainer = styled(Flex)`
  justify-content: flex-start;
  align-items: center;

  ${justifyContent};
`
export const Cell = styled(Flex)`
  align-items: center;
  height: 100%;
`
