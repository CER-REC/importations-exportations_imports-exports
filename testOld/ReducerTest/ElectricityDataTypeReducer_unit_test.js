const Chai = require('chai')
const Expect = Chai.expect

const ElectricityDataTypeReducer = require('../../app/reducers/ElectricityDataTypeReducer.js')

describe('ElectricityDataTypeReducer', function() {

  it('should respond to "SetElectricityDataType" with the value "price" passed', function() {
    const result = ElectricityDataTypeReducer('electricity', {type: 'SetElectricityDataType', electricityDataType: 'price'})
    Expect(result).to.be.equal('price')
  })
  it('should respond to "SetElectricityDataType" with the value "mwh" passed', function() {
    const result = ElectricityDataTypeReducer('mwh', {type: 'SetElectricityDataType', electricityDataType: 'mwh'})
    Expect(result).to.be.equal('mwh')
  })
it('should respond to "SetElectricityDataType" with the default state when wrong electircityDataType type  is passed', function() {
    const result = ElectricityDataTypeReducer('price', {type: 'SetElectricityDataType', electricityDataType: 'ml'})
    Expect(result).to.be.equal('price')
  })

it('should respond with default state i.e. "price" to "SomeRandomActionCreator"', function() {
    const result = ElectricityDataTypeReducer('price', {type: 'SomeRandomActionCreator', electricityDataType: 'price'})
    Expect(result).to.be.equal('price')
  })
})

