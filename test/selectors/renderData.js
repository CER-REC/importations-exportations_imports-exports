import { expect } from 'chai'

import basicState from './basicState'
import * as Selectors from '../../app/selectors/core'

// Import tests for selectors that these may call
import './core'

describe('renderData', () => {
  describe('calculateValue', () => {
    it('should pass to calculateValueSum')

    it('should pass to calculateValueAverage')

    it('should pass to calculateValueWeightedAverage')

    it('should count the total points for each value')

    it('should calculate how many of each value are confidential')
  })

  describe('calculateValueSum', () => {
    it('should provide the values as a nested object')

    it('should calculate values as a sum')
  })

  describe('calculateValue', () => {
    it('should provide the values as a nested object')

    it('should calculate values as an average')
  })

  describe('calculateValueWeighted', () => {
    it('should provide the values as a nested object')

    it('should calculate values as a weighted average')
  })

  describe('chartSelector', () => {
    it('should not filter data by timeline selection')
  })

  describe('mapSelector', () => {
    it('should not filter data for the selected country')
  })

  describe('calculateBrokenData', () => {
    it('should count the missing and confidential data')

    it('should return in the same values format as calculateValue')
  })

  describe('brokenDataSelector', () => {
    it('should filter by map and timeline')

    it('should use calculateBrokenData as the value')
  })

  describe('detailBreakdownValues', () => {
    it('should filter by map and timeline')

    it('should add calculateBrokenData to the data')
  })

  describe('detailTotal', () => {
    it('should sum the values of each detail breakdown row')
  })

  describe('detailBreakdown', () => {
    it('should calculate a percentage of the detail total for each value')
  })
})
