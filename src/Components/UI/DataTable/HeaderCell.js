import React from 'react'
import PropTypes from 'prop-types'

import omit from 'lodash/omit'

import { sortArrowGlyph } from 'Assets/Svg/Table'

import { HeaderCellContainer, Sortable, IconAsc, IconDesc } from './styles'

const HeaderCell = ({ children, column, ...rest }) => (
  <HeaderCellContainer {...omit(rest, ['data'])}>
    {children}
    {column.sortable !== false && (
      <Sortable>
        <IconAsc glyph={sortArrowGlyph} size={10} />
        <IconDesc glyph={sortArrowGlyph} size={10} />
      </Sortable>
    )}
  </HeaderCellContainer>
)

HeaderCell.defaultProps = {
  children: null,
}

HeaderCell.propTypes = {
  children: PropTypes.node,
  column: PropTypes.object.isRequired,
}

export default HeaderCell
