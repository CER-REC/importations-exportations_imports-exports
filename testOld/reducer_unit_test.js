const Chai = require('chai')
const Expect = Chai.expect
const Immutable = require('immutable')

const SampleReducer = require('../app/reducers/SampleReducer.js')


// For more about writing tests with Redux:
// https://redux.js.org/docs/recipes/WritingTests.html

describe('SampleReducer', function() {

  it('should respond to "Append" actions by appending things to the state', function() {
    const list = Immutable.List([1])
    const result = SampleReducer(list, {type: 'Append', item: 2})

    Expect(result.toArray()).to.have.lengthOf(2)
    Expect(result.get(1)).to.equal(2)
  })

  it('should respond to "Reset" actions with an empty list', function() {
    const list = Immutable.List([1])
    const result = SampleReducer(list, {type: 'Reset'})
    Expect(result).to.equal(Immutable.List())
  })

  it('should respond to other actions with the same state as before', function() {
    const list = Immutable.List([1])
    const result = SampleReducer(list, {type: 'Woah There!'})
    Expect(list).to.equal(result)
  })

})

