const Chai = require('chai')
const Expect = Chai.expect

const SetVisualizationCreator = require('../../app/actionCreators/SetVisualizationCreator.js')

describe('SetVisualizationCreator', function() {

  it('should respond to "SetVisualizationActionCreator" with the value "crudeOil and SetVisualization" passed', function() {
    const actionCreator = SetVisualizationCreator('crudeOil')
    Expect(actionCreator).to.deep.equal({
      type: 'SetVisualization',
      visualization: 'crudeOil'
    })  
  })
})

