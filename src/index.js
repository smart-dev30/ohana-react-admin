import React from 'react'
import ReactDOM from 'react-dom'

import Container from 'Container'

const render = Component => {
  ReactDOM.render(<Component />, document.getElementById('root'))
}

render(Container)

if (module.hot) {
  module.hot.accept('./Container', () => {
    // eslint-disable-next-line global-require
    const NextContainer = require('Container').default
    render(NextContainer)
  })
}
