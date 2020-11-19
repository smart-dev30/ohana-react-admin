import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import Icon from '../Icon'
import { ActionContainer } from './styles'

class Action extends PureComponent {
  handleSelect = () => {
    const { entity, onSelect, onAction } = this.props
    onSelect(entity)
    onAction()
  }

  render() {
    const { label, glyph } = this.props

    return (
      <ActionContainer onClick={this.handleSelect}>
        <Icon glyph={glyph} size={16} />
        {label}
      </ActionContainer>
    )
  }
}

Action.defaultProps = { entity: null }
Action.propTypes = {
  entity: PropTypes.any,
  glyph: PropTypes.object.isRequired,
  label: PropTypes.node.isRequired,
  onAction: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
}

export default Action
