import { Types as DataTypes } from '../actions/data'
import { Types as visualizationSettingsTypes } from '../actions/visualizationSettings'
import { Types as explanationTypes } from '../actions/explanations'
import { timelineYearScaleCalculation } from '../selectors/timeline'
import { activityOptions, arrangeByOptions } from '../selectors/menus'

let initializedFromURL = []

const initialVisualizationSettings = store => next => (action) => {
  // Process the action immediately
  next(action)

  if (action.type === 'urlRouteChanged') {
    initializedFromURL = Object.keys(action.payload.visualizationSettings)
  }
  // If we aren't loading data, don't change the visualization settings
  if (action.type === DataTypes.LOAD_DATA || action.type === visualizationSettingsTypes.RESET_VISUALIZATION_STATE) {
    const state = store.getState()
    const { data } = state
    data.keySeq().filter(v => !initializedFromURL.includes(v)).forEach((visualization) => {
      const visData = data.get(visualization)
      const amount = visData.keySeq().first()
      const activityGroup = activityOptions(state, { _overrideVisualization: visualization })[0]
      const arrangeBy = arrangeByOptions(state, { _overrideVisualization: visualization })[0]
      // TODO: This needs to somehow not use reselect
      const yearScale = timelineYearScaleCalculation(state, {
        _overrideVisualization: visualization,
        _overrideAmount: amount,
        _overrideActivityGroup: activityGroup,
        _overrideArrangeBy: 'location',
      })
      const initializeAction = {
        type: visualizationSettingsTypes.RESET_VISUALIZATION,
        payload: {
          settings: {
            amount,
            arrangeBy,
            activity: activityGroup,
            subtype: '',
            selection: {
              country: null,
              origins: [],
              destinations: {},
              provinces: [],
              ports: [],
            },
            timeline: {
              scaleLinked: true,
              grouping: 'year',
              range: {
                start: { year: yearScale.min, quarter: 1 },
                end: { year: yearScale.max, quarter: 4 },
              },
            },
          },
        },
        meta: { visualization },
      }
      store.dispatch(initializeAction)
      if(action.type === visualizationSettingsTypes.RESET_VISUALIZATION_STATE){
        store.dispatch({
          type: explanationTypes.RESET_EXPLANATION,
        })
      }
    })
  }
}

export default initialVisualizationSettings
