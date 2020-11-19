import styled from 'styled-components'

import { DataTable as BaseDataTable } from 'Components/UI'

export const DataTable = styled(BaseDataTable)`
  .rt-table {
    .rt-thead {
      padding: 0;

      .rt-th:not(:last-child) {
        border-right: 1px solid rgba(0, 0, 0, 0.05) !important;
      }
    }
  }
`

export default {}
