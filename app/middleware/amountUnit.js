const SetElectricityDataTypeCreator = require('../actionCreators/SetElectricityDataTypeCreator')
const Constants = require ('../Constants')

const amountUnit = store => next => action => {
  // Process the action immediately
  next(action)

  // TODO: Convert SetVisualization to constant
  // If we aren't changing the data displayed, don't reset the amount unit
  if (action.type !== 'SetVisualization') { return }

  const validUnits =
    Constants.getIn(['energyMeasurementTypes', action.visualization])

  // If the current unit is valid, don't dispatch a new event
  if (validUnits.contains(store.getState().electricityDataTypes)) { return }

  store.dispatch(SetElectricityDataTypeCreator(validUnits.get(0)))
}

module.exports = amountUnit
