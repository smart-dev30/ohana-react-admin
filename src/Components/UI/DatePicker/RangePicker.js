import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import { DateTime } from 'luxon'
import { DateUtils } from 'react-day-picker'

import noop from 'lodash/noop'

import { Picker } from './styles'

function isSelectingFirstDay(from, to, day) {
  const isBeforeFirstDay = from && DateUtils.isDayBefore(day, from)
  const isRangeSelected = from && to
  return !from || isBeforeFirstDay || isRangeSelected
}

function getInitialState() {
  return {
    from: null,
    to: null,
    enteredTo: null,
  }
}

function DateRangePicker({ numberOfMonths, timeZone, onFinish }) {
  const [state, setState] = useState(getInitialState())

  const dayClick = useCallback(
    day => {
      const { from, to } = state

      if (from && to && day >= from && day <= to) {
        setState(getInitialState())
        return
      }

      if (isSelectingFirstDay(from, to, day)) {
        setState({
          from: day,
          to: null,
          enteredTo: null,
        })
      } else {
        setState({
          from,
          to: day,
          enteredTo: day,
        })

        onFinish({
          from: DateTime.fromJSDate(from, { zone: timeZone }).startOf('day'),
          to: DateTime.fromJSDate(day, { zone: timeZone }).endOf('day'),
        })
      }
    },
    [state, timeZone, onFinish],
  )

  const dayEnter = useCallback(
    day => {
      const { from, to } = state
      if (isSelectingFirstDay(from, to, day)) return

      setState({
        from,
        to,
        enteredTo: day,
      })
    },
    [state],
  )

  const { from, enteredTo } = state
  const modifiers = { start: from, end: enteredTo }
  const selectedDays = [from, { from, to: enteredTo }]

  return (
    <Picker
      fixedWeeks
      modifiers={modifiers}
      numberOfMonths={numberOfMonths}
      selectedDays={selectedDays}
      onDayClick={dayClick}
      onDayMouseEnter={dayEnter}
    />
  )
}

DateRangePicker.defaultProps = {
  numberOfMonths: 1,
  timeZone: null,
  onFinish: noop,
}

DateRangePicker.propTypes = {
  numberOfMonths: PropTypes.number,
  timeZone: PropTypes.string,
  onFinish: PropTypes.func,
}

export default DateRangePicker
