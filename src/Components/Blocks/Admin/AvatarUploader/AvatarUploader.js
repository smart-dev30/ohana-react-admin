import React, { Fragment, PureComponent } from 'react'
import { PropTypes } from 'prop-types'
import get from 'lodash/get'
import head from 'lodash/head'
import keys from 'lodash/keys'
import { Flex } from 'rebass'

import { Button, Text, Icon } from 'Components/UI'
import { Container, Tooltip } from 'Components/Blocks/Forms/Input/styles'
import { closeGlyph } from 'Assets/Svg'
import { Input, Thumbnail, Preview, RemoveButton } from './styles'

class AvatarUploader extends PureComponent {
  state = { isLoading: false, isDisabled: false }

  get buttonLabel() {
    const { isLoading } = this.state

    const { image } = this.props

    if (isLoading) return 'Loading...'
    if (image) return 'Change photo'

    return 'Upload'
  }

  handleChange = async e => {
    const { onUploadFile, input } = this.props
    const file = head(get(e, 'target.files', []))

    if (file) {
      this.setState({ isLoading: true })

      const { ok, payload } = await onUploadFile('/admin/images', file)

      if (ok) {
        this.setState({ isLoading: false })

        const imageId = head(keys(get(payload, 'data.images', {})))
        if (imageId) input.onChange(imageId)
      }
    }
  }

  handleRemove = () => {
    const { input } = this.props

    input.onChange(null)
  }

  render = () => {
    const { meta, title, glyph, image, editable } = this.props
    const { isLoading, isDisabled } = this.state
    const error = meta.touched && meta.error ? 1 : 0

    return (
      <Fragment>
        <Text color="brownishGray" fontWeight="bold" textAlign="center">
          {title}
        </Text>

        <Thumbnail my={3}>
          {image ? (
            <Fragment>
              <RemoveButton m={2} onClick={this.handleRemove}>
                <Icon fill="white" glyph={closeGlyph} size={16} />
              </RemoveButton>
              <Preview value={get(image, 'content.medium.url', '')} />
            </Fragment>
          ) : (
            <Icon glyph={glyph} height={100} />
          )}
        </Thumbnail>

        <Container error={error}>
          <Flex justifyContent="center">
            <Button
              disabled={isLoading || isDisabled || editable}
              height={40}
              secondary
              width={168}
            >
              <Input
                disabled={isLoading || isDisabled || editable}
                onChange={this.handleChange}
              />
              {this.buttonLabel}
            </Button>
          </Flex>

          {error === 1 && (
            <Tooltip centered="true">{meta.error.map(item => item)}</Tooltip>
          )}
        </Container>
      </Fragment>
    )
  }
}

AvatarUploader.defaultProps = { image: null, title: '' }
AvatarUploader.propTypes = {
  editable: PropTypes.bool.isRequired,
  glyph: PropTypes.object.isRequired,
  image: PropTypes.object,
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  title: PropTypes.string,
  onUploadFile: PropTypes.func.isRequired,
}

export default AvatarUploader
