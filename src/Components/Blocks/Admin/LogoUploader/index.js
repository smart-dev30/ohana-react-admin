import React from 'react'
import { Field } from 'react-final-form'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'

import { getLogo } from 'Store/Selectors/images'
import { uploadFile } from 'Store/Actions/uploading'
import LogoUploader from './LogoUploader'

const ConnectedComponent = connect(
  createStructuredSelector({
    image: (state, props) => {
      return isEmpty(props.image)
        ? getLogo(get(props, 'input.value'))(state, props)
        : props.image
    },
    disabled: (state, props) => props.disabled,
  }),
  { onUploadFile: uploadFile },
)(LogoUploader)

export default props => (
  <Field allowNull {...props} component={ConnectedComponent} />
)
