import React from 'react'
import { Field } from 'react-final-form'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import get from 'lodash/get'

import { getImage } from 'Store/Selectors/images'
import { uploadFile } from 'Store/Actions/uploading'
import AvatarUploader from './AvatarUploader'

const ConnectedComponent = connect(
  createStructuredSelector({
    image: (state, props) => getImage(get(props, 'input.value'))(state, props),
    disabled: (state, props) => props.disabled,
  }),
  { onUploadFile: uploadFile },
)(AvatarUploader)

export default props => (
  <Field allowNull {...props} component={ConnectedComponent} />
)
