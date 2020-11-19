import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import omit from 'lodash/omit'

import Item from './Item'

import { Container } from './styles'

class Steps extends PureComponent {
  handleChangeStep = step => {
    const { onChangeStep, disabled } = this.props

    if (disabled.indexOf(step) !== -1) return

    if (onChangeStep) onChangeStep(step)
  }

  renderItems = () => {
    const {
      step: activeStep,
      allSteps,
      disabled,
      completed,
      size,
      line,
    } = this.props

    return allSteps.map(step => {
      const key = `step-${step}`
      return (
        <Item
          active={step === activeStep ? 1 : 0}
          completed={completed.indexOf(step) !== -1}
          disabled={disabled.indexOf(step) !== -1}
          key={key}
          line={line}
          number={step}
          size={size}
          step={step}
          onChangeStep={this.handleChangeStep}
        />
      )
    })
  }

  render() {
    const { step, allSteps, size, gap, line, completed } = this.props

    return (
      <Container
        completedLength={completed.length}
        count={allSteps.length}
        gap={gap}
        line={line}
        size={size}
        stepIndex={allSteps.indexOf(step) + 1}
        {...omit(this.props, ['onChangeStep'])}
      >
        {this.renderItems()}
      </Container>
    )
  }
}

Steps.displayName = 'Steps'

Steps.defaultProps = {
  allSteps: [],
  step: '',
  completed: [],
  disabled: [],
  gap: 80,
  line: 4,
  size: 20,
  onChangeStep: null,
}

Steps.propTypes = {
  allSteps: PropTypes.array,
  completed: PropTypes.array,
  disabled: PropTypes.array,
  gap: PropTypes.number,
  line: PropTypes.number,
  size: PropTypes.number,
  step: PropTypes.string,
  onChangeStep: PropTypes.func,
}

export default Steps
