import React, { useCallback, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import Tippy from '@tippyjs/react/headless'
import { Field } from 'react-final-form'
import { pick } from '@styled-system/props'

import DatePicker from 'Components/UI/DatePicker/DatePicker'

import { Container, Value, CalendarIcon } from './styles'

import { Tooltip } from '../Input/styles'

function DateInputPicker({ input, placeholder, meta, small, ...rest }) {
  const tippyInstance = useRef(null)
  const [touched, setTouched] = useState(false)

  const error = (touched || meta.touched) && meta.error ? 1 : 0
  const handleFinish = useCallback(
    pickedDate => {
      input.onChange(pickedDate)

      if (tippyInstance.current) {
        tippyInstance.current.hide()
      }
    },
    [input.onChange],
  )

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
        <CalendarIcon />
        <Value
          disabled
          placeholder={placeholder}
          value={input.value.toLocaleString()}
        />
        {(touched || meta.touched) && meta.error && (
          <Tooltip centered={rest.centered}>
            {meta.error.map(item => item)}
          </Tooltip>
        )}
      </Container>
    </Tippy>
  )
}

DateInputPicker.defaultProps = {
  placeholder: null,
  small: false,
}

DateInputPicker.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  placeholder: PropTypes.string,
  small: PropTypes.bool,
}

const DateInput = ({ label, name, placeholder, type, tip, ...rest }) => (
  <Field
    label={label}
    name={name}
    placeholder={placeholder}
    render={DateInputPicker}
    tip={tip}
    type={type}
    {...rest}
  />
)

DateInput.defaultProps = {
  label: '',
  placeholder: '',
  type: 'text',
  tip: null,
}

DateInput.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  tip: PropTypes.string,
  type: PropTypes.string,
}

export default DateInput
