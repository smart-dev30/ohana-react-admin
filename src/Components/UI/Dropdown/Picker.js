import React, { Component } from 'react'
import PropTypes from 'prop-types'

import isEmpty from 'lodash/isEmpty'

import chevronGlyph from 'Assets/Svg/chevron.svg'

import { DropdownContext } from 'Services/Context'

import Icon from '../Icon'

import { PickerWrapper } from './styles'

class Picker extends Component {
  state = {}

  render() {
    const { children, fill } = this.props
    const { opened } = this.context
    return (
      <PickerWrapper opened={opened ? 1 : 0}>
        {children}
        <Icon fill={!isEmpty(fill) && fill} glyph={chevronGlyph} size={10} />
      </PickerWrapper>
    )
  }
}

Picker.contextType = DropdownContext

Picker.displayName = 'Dropdown.Picker'

Picker.defaultProps = {
  children: null,
  fill: '',
}

Picker.propTypes = {
  children: PropTypes.node,
  fill: PropTypes.string,
}

export default Picker
