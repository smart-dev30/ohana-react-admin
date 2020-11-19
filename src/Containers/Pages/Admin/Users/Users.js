import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Flex } from 'rebass'

import { FilterForm } from 'Components/Blocks/Admin'
import { Title } from 'Components/UI'

import UsersTable from './UsersTable'

const { UsersFilterForm } = FilterForm

class Users extends PureComponent {
  state = {
    isLoaded: false,
    size: 10,
  }

  componentDidMount = async () => {
    const { onLoadUsers, users, paged, formData } = this.props
    const { size } = this.state

    if (!users.isLoaded) {
      const result = await onLoadUsers({
        paged: true,
        filters: formData,
        ...paged,
        size,
      })

      if (result) {
        this.setState({
          isLoaded: true,
        })
      }
    } else {
      this.setState({ isLoaded: true })
    }
  }

  onPageChanged = number => {
    const { onPageChange } = this.props
    onPageChange('users', number + 1)
  }

  render() {
    const { users, paged } = this.props
    const { onPageChanged } = this
    const { isLoaded, size } = this.state

    return (
      <div>
        <Flex alignItems="center" justifyContent="space-between" my={4}>
          <Title>Users</Title>
        </Flex>
        <Flex flexWrap="wrap">
          <Flex mb={3} width={1}>
            <UsersFilterForm />
          </Flex>
          <UsersTable
            data={users.entities}
            isLoaded={isLoaded}
            paged={paged}
            size={size}
            onPageChange={onPageChanged}
          />
        </Flex>
      </div>
    )
  }
}

Users.propTypes = {
  formData: PropTypes.object.isRequired,
  paged: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
  onLoadUsers: PropTypes.func.isRequired,
  onPageChange: PropTypes.func.isRequired,
}

export default Users
