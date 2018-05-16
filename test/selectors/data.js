import { expect } from 'chai'

import basicState from './basicState'
import * as Selectors from '../../app/selectors/data'

describe('data', () => {
  describe('arrangeBy', () => {
    it('should support being overridden by props', () => {
      expect(Selectors.arrangeBy(basicState)).to.equal('location');
      expect(Selectors.arrangeBy(basicState, { _overrideArrangeBy: 'amount' }))
        .to.equal('amount');
    })
  })

  describe('amount', () => {
    it('should support being overridden by props', () => {
      expect(Selectors.amount(basicState)).to.equal('MW.h');
      expect(Selectors.amount(basicState, { _overrideAmount: 'CAN$' }))
        .to.equal('CAN$');
    })
  })

  describe('activity', () => {
    it('should support being overridden by props', () => {
      expect(Selectors.selectedActivityGroup(basicState)).to.equal('imports');
      expect(Selectors.selectedActivityGroup(basicState, { _overrideActivityGroup: 'exports' }))
        .to.equal('exports');
    })
  })
})
