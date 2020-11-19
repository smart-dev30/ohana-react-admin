import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Field } from 'react-final-form'
import { DateUtils } from 'react-day-picker'
import { DateTime } from 'luxon'

import noop from 'lodash/noop'

import { Tip } from 'Components/UI'

import { Label, TipWrapper, Tooltip } from '../Input/styles'
import { Container, StyledDayPickerInput, CalendarIcon } from './styles'

const FORMAT = 'yyyy-LL-dd'
const FORMAT_RANGE = 'LL/dd/yy'

class DayPicker extends PureComponent {
  state = {
    from: undefined,
    to: undefined,
  }

  formatDate = date => {
    const { ranged } = this.props
    if (ranged) {
      const { from, to } = DateUtils.addDayToRange(date, this.state)

      if (from && to) {
        if (from.getTime() === to.getTime()) {
          return DateTime.fromJSDate(from).toFormat(FORMAT)
        }

        return `${DateTime.fromJSDate(from).toFormat(
          FORMAT_RANGE,
        )}-${DateTime.fromJSDate(to).toFormat(FORMAT_RANGE)}`
      }

      return ''
    }

    return DateTime.fromJSDate(date).toFormat(FORMAT)
  }

  handleDayChange = input => date => {
    const { ranged } = this.props

    if (ranged) {
      const range = DateUtils.addDayToRange(date, this.state)
      if (
        (range.from && range.to) ||
        (range.from === null && range.to === null)
      ) {
        input.onChange(range)
      }
      this.setState(range)
    } else {
      input.onChange(date)
    }
  }

  renderField = ({ tip, meta, label, input, ...rest }) => {
    const { from, to } = this.state
    const modifiers = { start: from, end: to }
    const { ranged, value, disabled } = this.props
    const { active, touched, error, submitError, dirtySinceLastSubmit } = meta

    const hasError =
      touched && (error || (submitError && !dirtySinceLastSubmit))

    return (
      <Container active={active} error={hasError} ranged={ranged} {...rest}>
        {label && (
          <Label htmlFor={input.id} mb={2}>
            {label}
          </Label>
        )}

        {tip && (
          <TipWrapper>
            <Tip>{tip}</Tip>
          </TipWrapper>
        )}

        <StyledDayPickerInput
          clickUnselectsDay={!ranged}
          dayPickerProps={{
            selectedDays: ranged ? [from, { from, to }] : input.value,
            modifiers,
            onDayClick: this.handleDayChange(input),
          }}
          formatDate={this.formatDate}
          hideOnDayClick={!ranged}
          inputProps={{
            readOnly: true,
            disabled,
            autoComplete: 'off',
            placeholder: ranged ? 'mm/dd/yy-mm/dd/yy' : 'mm/dd/yyyy',
          }}
          value={value}
          onDayChange={ranged ? noop : this.handleDayChange(input)}
        />
        <CalendarIcon withLabel={label} />

        {meta.touched && meta.error && (
          <Tooltip centered={rest.centered}>
            {meta.error.map(item => item)}
          </Tooltip>
        )}
      </Container>
    )
  }

  render() {
    return <Field render={this.renderField} {...this.props} />
  }
}

DayPicker.defaultProps = {
  ranged: false,
  value: '',
  disabled: false,
}

DayPicker.propTypes = {
  disabled: PropTypes.bool,
  name: PropTypes.string.isRequired,
  ranged: PropTypes.bool,
  value: PropTypes.string,
}

export default DayPicker
