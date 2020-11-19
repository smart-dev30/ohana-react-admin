import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import { StyledSelect, DropdownIcon } from './styles'

const DropdownIndicator = () => <DropdownIcon />

const Select = ({ className, options, components, portal, ...rest }) => (
  <StyledSelect
    blurInputOnSelect={false}
    className={`${className} react-select__container`}
    classNamePrefix="react-select"
    components={{ DropdownIndicator, ...components }}
    menuPortalTarget={portal}
    options={options}
    {...rest}
  />
)

Select.emptyComponent = () => <Fragment />

Select.displayName = 'Select'

Select.defaultProps = {
  className: '',
  portal: null,
  components: {},
}

Select.propTypes = {
  className: PropTypes.string,
  components: PropTypes.object,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
    }),
  ).isRequired,
  portal: PropTypes.object,
}

export default Select
