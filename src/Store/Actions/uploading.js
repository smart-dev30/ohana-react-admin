import nanoid from 'nanoid'

import { createAsyncAction } from 'Store/utils'

import apiCall from 'Services/Api'

export const UPLOAD_FILE = createAsyncAction('uploading/FILE', {
  withProgress: true,
})

export const CANCEL_UPLOAD = 'uploading/CANCEL'

export const uploadFile = (endpoint, file, name = 'content', query = null) =>
  apiCall({
    endpoint,
    method: 'POST',
    file,
    fileFieldName: name,
    query,
    payload: {
      id: nanoid(),
      file: {
        name: file.name,
        size: file.size,
      },
    },
    types: UPLOAD_FILE,
  })

export const cancelUpload = fileId => ({
  type: CANCEL_UPLOAD,
  payload: {
    id: fileId,
  },
})
