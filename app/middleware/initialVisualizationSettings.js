const DataTypes = require('../actions/data').Types
const {
  Types: visualizationSettingsTypes,
} = require('../actions/visualizationSettings')
const { timelineYearScaleCalculation } = require('../selectors/timeline')

const initialVisualizationSettings = store => next => action => {
  // Process the action immediately
  next(action)

  // If we aren't loading data, don't change the visualization settings
  if (action.type !== DataTypes.LOAD_DATA) { return }

  const state = store.getState()
  const { data } = state
  data.keySeq().forEach(visualization => {
    const visData = data.get(visualization)
    const amount = visData.keySeq().first()
    // TODO: This needs to somehow not use reselect
    const yearScale = timelineYearScaleCalculation(state, {
      _overrideVisualization: visualization,
      _overrideAmount: amount,
      _overrideActivityGroup: 'importsExports',
      _overrideArrangeBy: 'location',
    })
    const initializeAction = {
      type: visualizationSettingsTypes.RESET_VISUALIZATION,
      payload: {
        settings: {
          amount,
          arrangeBy: 'location',
          activity: 'importsExports',
          subtype: '',
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
  })
}

module.exports = initialVisualizationSettings
