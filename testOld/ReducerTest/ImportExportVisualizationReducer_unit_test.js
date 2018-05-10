const Chai = require('chai')
const Expect = Chai.expect

const ImportExportVisualizationReducer = require('../../app/reducers/ImportExportVisualizationReducer.js')

describe('ImportExportVisualizationReducer', function() {

  it('should respond to "SetVisualization" with the value "crudeOil" passed', function() {
    const result = ImportExportVisualizationReducer('electricity', {type: 'SetVisualization', visualization: 'crudeOil'})
    Expect(result).to.be.equal('crudeOil')
  })
  it('should respond to "SetVisualization" with the value "naturalGas" passed', function() {
    const result = ImportExportVisualizationReducer('electricity', {type: 'SetVisualization', visualization: 'naturalGas'})
    Expect(result).to.be.equal('naturalGas')
  })
  it('should respond to "SetVisualization" with the value "refinedPetroleumProducts" passed', function() {
    const result = ImportExportVisualizationReducer('electricity', {type: 'SetVisualization', visualization: 'refinedPetroleumProducts'})
    Expect(result).to.be.equal('refinedPetroleumProducts')
  })
  it('should respond to "SetVisualization" with the value "naturalGasLiquids" passed', function() {
    const result = ImportExportVisualizationReducer('electricity', {type: 'SetVisualization', visualization: 'naturalGasLiquids'})
    Expect(result).to.be.equal('naturalGasLiquids')
  })
  it('should respond to "SetVisualization" with the value "electricity" passed', function() {
    const result = ImportExportVisualizationReducer('electricity', {type: 'SetVisualization', visualization: 'electricity'})
    Expect(result).to.be.equal('electricity')
  })
it('should respond to "SetVisualization" with the default state when wrong visualization type  is passed', function() {
    const result = ImportExportVisualizationReducer('electricity', {type: 'SetVisualization', visualization: 'crudeOils'})
    Expect(result).to.be.equal('electricity')
  })

it('should respond with default state i.e. "electricity" to "SomeRandomActionCreator"', function() {
    const result = ImportExportVisualizationReducer('electricity', {type: 'SomeRandomActionCreator', visualization: 'crudeOil'})
    Expect(result).to.be.equal('electricity')
  })
})

