import Constants from '../Constants'

export const Types = {
  SET_VISUALIZATION: 'setVisualization',
}

export const setVisualization = visualization => ({
  type: Types.SET_VISUALIZATION,
  visualization,
})

const initialState = ''
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.SET_VISUALIZATION:
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
