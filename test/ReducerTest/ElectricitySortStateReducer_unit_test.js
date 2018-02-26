const Chai = require('chai')
const Expect = Chai.expect

const ElectricitySortStateReducer = require('../../app/reducers/ElectricitySortStateReducer.js')

describe('ElectricitySortStateReducer', function() {

  it('should respond to "SortElectricityData" with the value "location" passed', function() {
    const result = ElectricitySortStateReducer('import', {type: 'SortElectricityData', sortBy: 'location'})
    Expect(result).to.be.equal('location')
  })
  it('should respond to "SortElectricityData" with the value "import" passed', function() {
    const result = ElectricitySortStateReducer('location', {type: 'SortElectricityData', sortBy: 'import'})
    Expect(result).to.be.equal('import')
  })
  it('should respond to "SortElectricityData" with the value "export" passed', function() {
    const result = ElectricitySortStateReducer('location', {type: 'SortElectricityData', sortBy: 'export'})
    Expect(result).to.be.equal('export')
  })
  it('should respond to "SortElectricityData" with the default state when wrong sortBy type  is passed', function() {
    const result = ElectricitySortStateReducer('location', {type: 'SortElectricityData', sortBy: 'price'})
    Expect(result).to.be.equal('location')
  })

  it('should respond with default state i.e. "location" to "SomeRandomActionCreator"', function() {
    const result = ElectricitySortStateReducer('location', {type: 'SomeRandomActionCreator', sortBy: 'export'})
    Expect(result).to.be.equal('location')
  })
})