import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { StyledOption } from '../styles'

class Item extends PureComponent {
  handleSelect = () => {
    const { value, label, onSelect } = this.props
    if (onSelect) onSelect(value, label)
  }

  render() {
    const { selected, label } = this.props
    return (
      <StyledOption
        {...this.props}
        className={selected && 'selected'}
        selected={selected}
        onClick={this.handleSelect}
      >
        {label}
      </StyledOption>
    )
  }
}

Item.defaultProps = {
  selected: false,
}

Item.propTypes = {
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.node,
  ]).isRequired,
  selected: PropTypes.bool,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
    PropTypes.array,
  ]).isRequired,
  onSelect: PropTypes.func.isRequired,
}

export default Item
