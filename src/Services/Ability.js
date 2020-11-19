import { createContext } from 'react'
import { AbilityBuilder, Ability } from '@casl/ability'
import { createContextualCan } from '@casl/react'

import forEach from 'lodash/forEach'

import ACCESS from 'Constants/access'

export const AbilityContext = createContext()

export const Can = createContextualCan(AbilityContext.Consumer)

export const viewerAbilities = viewer => {
  const methods = AbilityBuilder.extract()

  forEach(ACCESS[viewer.type], (abilities, action) => {
    forEach(abilities, (resources, ability) => {
      methods[action](ability, resources)
    })
  })

  return new Ability(methods.rules)
}
