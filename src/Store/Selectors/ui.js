import { createSelector } from 'reselect'

export const getState = state => state.ui

export const getFilterForm = type =>
  createSelector(
    getState,
    state => state[`${type}FilterForm`],
  )

export const getSorted = type =>
  createSelector(
    getState,
    state => state[`${type}Sorted`],
  )
