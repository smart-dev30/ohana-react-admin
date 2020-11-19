import React from 'react'
import PropTypes from 'prop-types'

import { Cell as CellBase } from './styles'

const Cell = ({ children }) => {
  return <CellBase>{children}</CellBase>
}
Cell.defaultProps = {
  children: null,
}

Cell.propTypes = {
  children: PropTypes.node,
}

export default Cell
