const SetElectricityDataTypeCreator = require('../actionCreators/SetElectricityDataTypeCreator')
const Constants = require ('../Constants')

const amountUnit = store => next => action => {
  // TODO: Convert SetVisualization to constant
  if (action.type === 'SetVisualization') {
    const validUnits =
      Constants.getIn(['energyMeasurementTypes', action.visualization])

    // Only dispatch an event if the current unit will be invalid
    if (validUnits.contains(store.getState().electricityDataTypes) === false) {
      store.dispatch(SetElectricityDataTypeCreator(validUnits.get(0)))
    }
  }

  next(action)
}

module.exports = amountUnit
