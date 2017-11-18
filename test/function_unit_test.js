const Chai = require('chai')
const Expect = Chai.expect
const Immutable = require('immutable')

const SampleComputations = require('../app/computations/SampleComputations.js')



describe('SampleComputations', function() {

  describe('concat', function() {

    it('should concatenate two immutable lists', function() {
      const result = SampleComputations.concat(Immutable.List([1,2]), Immutable.List([3,4]))
      Expect(result.toArray()).to.have.lengthOf(4)
    })

    it('should return the cached result object when called with the same arguments', function() {
      const listA = Immutable.List([1,2])
      const listB = Immutable.List([3,4])

      const resultOne = SampleComputations.concat(listA, listB)
      const resultTwo = SampleComputations.concat(listA, listB)
      Expect(resultOne).to.equal(resultTwo)
    })

  })

})

