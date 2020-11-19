import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import onClickOutside from 'react-onclickoutside'
import map from 'lodash/map'

import { actionMenuGlyph } from 'Assets/Svg/Table'
import Icon from '../Icon'
import Action from './Action'
import { Container, Handler, Actions } from './styles'

class MenuButton extends PureComponent {
  state = { opened: false }

  handleToggle = () => {
    this.setState(state => ({ opened: !state.opened }))
  }

  handleClickOutside = () => {
    this.setState({ opened: false })
  }

  render() {
    const { opened } = this.state
    const { actions } = this.props

    return (
      <Container>
        <Handler className={opened && 'opened'} onClick={this.handleToggle}>
          <Icon glyph={actionMenuGlyph} size={24} />
        </Handler>
        {opened && (
          <Actions>
            {map(actions, action => (
              <Action {...action} onAction={this.handleToggle} />
            ))}
          </Actions>
        )}
      </Container>
    )
  }
}

MenuButton.propTypes = {
  actions: PropTypes.array.isRequired,
}

export default onClickOutside(MenuButton)
