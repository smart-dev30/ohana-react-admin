import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'

import { DropdownContext } from 'Services/Context'

import Item from './Item'
import Picker from './Picker'
import Scrollable from '../Scrollable'

import {
  StyledDropdown,
  Opener,
  Menu,
  Placeholder,
  DefaultItem,
} from './styles'

class Dropdown extends PureComponent {
  state = {
    selected: null,
    opened: false,
  }

  mounted = true

  ref = null

  componentDidMount() {
    document.addEventListener('click', this.handleDocumentClick, false)
    document.addEventListener('touchend', this.handleDocumentClick, false)

    const { value } = this.props

    this.setState({
      selected: value,
    })
  }

  static getDerivedStateFromProps({ value }, { selected }) {
    if (isEmpty(value)) return null

    if (value && value !== selected) {
      return {
        selected: { value },
      }
    }

    return {
      selected: null,
    }
  }

  componentWillUnmount() {
    this.mounted = false
    document.removeEventListener('click', this.handleDocumentClick, false)
    document.removeEventListener('touchend', this.handleDocumentClick, false)
  }

  onChange = nextState => {
    const { selected } = this.state
    const { onChange } = this.props
    if (nextState.selected !== selected && onChange) {
      onChange(nextState.selected)
    }
  }

  addRef = ref => {
    this.ref = ref
  }

  handleSetValue = (value, label) => {
    const nextState = {
      selected: {
        value,
        label,
      },
      opened: false,
    }
    this.setState({ ...nextState })
    this.onChange(nextState)
  }

  handleDocumentClick = event => {
    if (this.mounted) {
      if (!this.ref.contains(event.target)) {
        this.setState({ opened: false })
      }
    }
  }

  handleMouseDown = event => {
    const { opened } = this.state

    if (event.type === 'mousedown' && event.button !== 0) return
    event.stopPropagation()
    event.preventDefault()

    this.setState({
      opened: !opened,
    })
  }

  renderOption(option, index) {
    const { selected } = this.state
    const { menuColor } = this.props

    const value = option.value || option.label || option
    const label = option.label || option.value || option
    const selectedValue = get(selected, 'value', null) || selected

    const key = `${value}-${index}`
    if (menuColor === 'primary') {
      return (
        <Item
          key={key}
          label={label}
          primary
          selected={value === selectedValue}
          value={value}
          onSelect={this.handleSetValue}
        />
      )
    }
    return (
      <Item
        key={key}
        label={label}
        selected={value === selectedValue}
        value={value}
        onSelect={this.handleSetValue}
      />
    )
  }

  render() {
    const {
      hideArrow,
      rounded,
      children,
      options,
      placeholder,
      menuColor,
      menuWidth,
      userCard,
      ...rest
    } = this.props
    const { opened } = this.state

    const disabled = isEmpty(options)
    return (
      <DropdownContext.Provider value={{ opened }}>
        <StyledDropdown
          disabled={disabled}
          opened={opened ? 1 : 0}
          ref={this.addRef}
          {...rest}
        >
          <Opener
            disabled={disabled}
            onMouseDown={!disabled ? this.handleMouseDown : () => {}}
            onTouchEnd={!disabled ? this.handleMouseDown : () => {}}
          >
            {children}
            <Picker fill={!disabled ? 'accent' : 'font.disabled'} />
          </Opener>
          {opened && (
            <Menu
              hideArrow={hideArrow ? 1 : 0}
              minWidth={menuWidth}
              rounded={rounded ? 1 : 0}
              userCard={userCard}
            >
              {!isEmpty(options) ? (
                <Scrollable maxHeight={240}>
                  {options.map((item, index) => this.renderOption(item, index))}
                </Scrollable>
              ) : (
                <Placeholder>{placeholder}</Placeholder>
              )}
            </Menu>
          )}
        </StyledDropdown>
      </DropdownContext.Provider>
    )
  }
}

Dropdown.displayName = 'Dropdown'

Dropdown.DefaultItem = DefaultItem

Dropdown.defaultProps = {
  hideArrow: false,
  menuColor: '',
  menuWidth: 'auto',
  options: [],
  placeholder: '',
  rounded: false,
  value: undefined,
  userCard: false,
  onChange: () => {},
}

Dropdown.propTypes = {
  children: PropTypes.node.isRequired,
  hideArrow: PropTypes.bool,
  menuColor: PropTypes.string,
  menuWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  options: PropTypes.array,
  placeholder: PropTypes.string,
  rounded: PropTypes.bool,
  userCard: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onChange: PropTypes.func,
}

export default Dropdown
