import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { checkMarkStepGlyph } from 'Assets/Svg'

import Icon from '../Icon'

import { Step } from './styles'

class Item extends PureComponent {
  handleChangeStep = () => {
    const { active, step, onChangeStep } = this.props
    if (!active && onChangeStep) onChangeStep(step)
  }

  render() {
    const { active, size, line, disabled, completed } = this.props
    return (
      <Step
        active={active ? 1 : 0}
        completed={completed ? 1 : 0}
        disabled={disabled}
        line={line}
        size={size}
        onClick={this.handleChangeStep}
      >
        {completed && <Icon glyph={checkMarkStepGlyph} size={12} />}
      </Step>
    )
  }
}

Item.defaultProps = {
  active: false,
  disabled: false,
}

Item.propTypes = {
  active: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  completed: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]).isRequired,
  disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  line: PropTypes.number.isRequired,
  size: PropTypes.number.isRequired,
  step: PropTypes.string.isRequired,
  onChangeStep: PropTypes.func.isRequired,
}

export default Item
