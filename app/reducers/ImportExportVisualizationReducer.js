import Constants from '../Constants'

const ImportExportVisualizationReducer = (state = 'electricity', action) => {
  switch (action.type) {
    case 'SetVisualization':
    // Only valid visualization name is allowed i.e. 'electricity',
    // 'crudeOil','naturalGas','refinedPetroleumProducts','naturalGasLiquids'
      if (Constants.get('visualizationTypes').contains(action.visualization)) {
        return action.visualization
      }
      return state
    default:
      return state
  }
}


export default ImportExportVisualizationReducer
