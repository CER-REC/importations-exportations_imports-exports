import { expect } from 'chai'

import basicState from './basicState'
import * as Selectors from '../../app/selectors/core'

// Import tests for selectors that these may call
import './data'

describe('core', () => {
  describe('getVisualizationData', () => {
    it('should return the selected product and unit', () => {
      expect(basicState.data.getIn(['electricity', 'MW.h'])
        .equals(Selectors.getVisualizationData(basicState))).to.equal(true)
    })
  })

  describe('filterByTimeline', () => {
    describe('year mode', () => {
      it('should filter years outside of the range')

      it('should filter quarters outside of the start range')

      it('should filter quarters outside of the end range')
    })

    describe('quarter mode', () => {
      it("should not filter if the start/end quarters don't match")

      it('should filter for quarters that match the start quarter')

      it('should filter for years that fall within the start and end')
    })
  })

  describe('filterByMap', () => {
    it("shouldn't filter if there is no selection")

    it("shouldn't filter crudeOil in Canada")

    it('should filter the destination for naturalGasLiquids')

    it('should filter the origin or destination for electricity')

    it('should filter the port for naturalGas')

    it('should filter the origin for crudeOil')
  })

  describe('filterByTimelineAndMap', () => {
    it('should return all results with no filters')

    it('should return results filtered by only timeline')

    it('should return results filtered by only map')

    it('should return results when both filters are replied')
  })

  describe('getActivityFilterPredicate', () => {
    it('should filter both activity and activityGroup')
  })
})
