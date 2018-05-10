import { expect } from 'chai'

import basicState from './basicState'
import * as Selectors from '../../app/selectors/renderData'

// Import tests for selectors that these may call
import './core'

describe('renderData', () => {
  describe('calculateValueSum', () => {
    it('should calculate values as a sum', () => {
      expect(Selectors.calculateValueSum(
        basicState.data.getIn(['electricity', 'MW.h']),
        'period',
        'activity',
      )).to.deep.equal({
        values: {
          '1990Q1': { exports: 453736.236 },
          '1990Q2': { exports: 59416.118 },
        },
        totalPoints: {
          '1990Q1': { exports: 2 },
          '1990Q2': { exports: 2 },
        },
        confidential: {
          '1990Q1': { exports: 0 },
          '1990Q2': { exports: 0 },
        },
        missing: {
          '1990Q1': { exports: 0 },
          '1990Q2': { exports: 0 },
        },
      })

      expect(Selectors.calculateValueSum(
        basicState.data.getIn(['electricity', 'MW.h']),
        'destination',
        'activity',
      )).to.deep.equal({
        values: {
          Alaska: { exports: 411.676 },
          California: { exports: 512740.678 },
        },
        totalPoints: {
          Alaska: { exports: 2 },
          California: { exports: 2 },
        },
        confidential: {
          Alaska: { exports: 0 },
          California: { exports: 0 },
        },
        missing: {
          Alaska: { exports: 0 },
          California: { exports: 0 },
        },
      })
    })
  })

  describe('calculateValueAverage', () => {
    it('should calculate values as an average', () => {
      expect(Selectors.calculateValueAverage(
        basicState.data.getIn(['naturalGasLiquids', 'm3/d']),
        'productSubtype',
        'activity',
      )).to.deep.equal({
        values: {
          Butane: { exports: 4034.4183945 },
          Propane: { exports: 309.2920635 },
        },
        totalPoints: {
          Butane: { exports: 2 },
          Propane: { exports: 2 },
        },
        confidential: {
          Butane: { exports: 0 },
          Propane: { exports: 0 },
        },
        missing: {
          Butane: { exports: 0 },
          Propane: { exports: 0 },
        },
      })
    })
  })

  describe('calculateValueWeighted', () => {
    it('should calculate values as a weighted average', () => {
      expect(Selectors.calculateValueWeighted(
        basicState.data.getIn(['electricity', 'CAN$/MW.h']),
        'period',
        'activity',
      )).to.deep.equal({
        values: {
          '1990Q1': { exports: 31.544475433961157 },
          '1990Q2': { exports: 22.769657889800204 },
          '1993Q4': { imports: 0 },
          '2005Q2': { exports: 0 },
        },
        totalPoints: {
          '1990Q1': { exports: 2 },
          '1990Q2': { exports: 2 },
          '1993Q4': { imports: 1 },
          '2005Q2': { exports: 1 },
        },
        confidential: {
          '1990Q1': { exports: 0 },
          '1990Q2': { exports: 0 },
          '1993Q4': { imports: 0 },
          '2005Q2': { exports: 1 },
        },
        missing: {
          '1990Q1': { exports: 0 },
          '1990Q2': { exports: 0 },
          '1993Q4': { imports: 1 },
          '2005Q2': { exports: 0 },
        },
      })
    })
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
