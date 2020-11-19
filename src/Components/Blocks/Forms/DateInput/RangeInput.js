import React, { useCallback, useMemo, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import Tippy from '@tippyjs/react/headless'
import { pick } from '@styled-system/props'

import { Field } from 'react-final-form'

import noop from 'lodash/noop'

import DatePicker from 'Components/UI/DatePicker/DatePicker'

import { Container, Value, CalendarIcon } from './styles'

import { Tooltip } from '../Input/styles'

function DateRangeInputPicker({
  input,
  placeholder,
  meta,
  small,
  onChange,
  ...rest
}) {
  const tippyInstance = useRef(null)
  const [dates, setDates] = useState(null)
  const [touched, setTouched] = useState(false)

  const error = (touched || meta.touched) && meta.error ? 1 : 0
  const handleFinish = useCallback(
    pickedDates => {
      setDates(pickedDates)
      input.onChange(pickedDates)

      if (tippyInstance.current) {
        tippyInstance.current.hide()
      }
    },
    [input.onChange],
  )

  const value = useMemo(() => {
    if (!dates) {
      return placeholder
    }

    const { from, to } = dates
    return `${from.toLocaleString()} — ${to.toLocaleString()}`
  }, [dates, placeholder])

  return (
    <Tippy
      interactive
      popperOptions={{
        modifiers: [
          {
            name: 'preventOverflow',
            options: {
              padding: 16,
            },
          },
        ],
      }}
      render={() => <DatePicker onFinish={handleFinish} />}
      trigger="click"
      onHide={() => {
        setTouched(true)
      }}
      onMount={instance => {
        tippyInstance.current = instance
      }}
    >
      <Container error={error} {...pick(rest)} small={small}>
        <CalendarIcon withLabel={value} />
        <Value>{value}</Value>
        {(touched || meta.touched) && meta.error && (
          <Tooltip centered={rest.centered}>
            {meta.error.map(item => item)}
          </Tooltip>
        )}
      </Container>
    </Tippy>
  )
}

DateRangeInputPicker.defaultProps = {
  placeholder: null,
  small: false,
  onChange: noop,
}

DateRangeInputPicker.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  placeholder: PropTypes.string,
  small: PropTypes.bool,
  onChange: PropTypes.func,
}

const DateRangeInput = ({ label, name, placeholder, type, tip, ...rest }) => (
  <Field
    label={label}
    name={name}
    placeholder={placeholder}
    render={DateRangeInputPicker}
    tip={tip}
    type={type}
    {...rest}
  />
)

DateRangeInput.defaultProps = {
  label: '',
  placeholder: '',
  type: 'text',
  tip: null,
}

DateRangeInput.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  tip: PropTypes.string,
  type: PropTypes.string,
}

export default DateRangeInput
