import React from 'react'
import PropTypes from 'prop-types'

import { logoGlyph } from 'Assets/Svg'

import { Button, Icon, Title } from 'Components/UI'

import { MOBILE_TYPES } from 'Constants/types'

import { IS_PRODUCTION } from 'Config/app'

import { getMobileOperatingSystem } from 'Services/Utils'

import { Container, Responsive } from './styles'

function getMobileUrl(location) {
  return `${IS_PRODUCTION ? 'olb' : 'olbstaging'}:/${location.pathname}${
    location.search
  }${location.hash}`
}

function MobileRedirector({ location }) {
  const os = getMobileOperatingSystem()

  /*
  // Temporary disable auto redirect
  useEffect(() => {
    if (
      window &&
      window.location &&
      [MOBILE_TYPES.iOS, MOBILE_TYPES.android].includes(os)
    ) {
      window.location = getMobileUrl(location)
    }
  }, [])
  */

  function handleDownloadApp() {
    switch (os) {
      case MOBILE_TYPES.iOS:
        // NOTE: https://support.google.com/chrome/thread/10249317?hl=en&msgid=14724109
        window.open(
          'https://itunes.apple.com/us/app/ohanalink-baby/id1507352284',
          '_blank',
        )
        break
      case MOBILE_TYPES.android:
        window.open(
          'https://play.google.com/store/apps/details?id=tech.ohanalink.baby',
          '_blank',
        )
        break
      default:
        break
    }
  }

  function handleOpenApp() {
    window.open(getMobileUrl(location))
  }

  return (
    <Container>
      <Responsive>
        <Icon glyph={logoGlyph} size={78} />
        <Title mt={2}>OhanaLink Baby</Title>
        <Button mt={4} width={200} onClick={handleDownloadApp}>
          Download App
        </Button>
        <Button link={1} mt={2} width={200} onClick={handleOpenApp}>
          Open App
        </Button>
      </Responsive>
    </Container>
  )
}

MobileRedirector.propTypes = {
  location: PropTypes.object.isRequired,
}

export default MobileRedirector
