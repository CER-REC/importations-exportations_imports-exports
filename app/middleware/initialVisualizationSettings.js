const DataTypes = require('../actions/data').Types
const {
  Types: visualizationSettingsTypes,
  timelineFilter,
} = require('../actions/visualizationSettings')
const { timelineYearScaleCalculation } = require('../selectors/timeline')

const initialVisualizationSettings = store => next => action => {
  // Process the action immediately
  next(action)

  // If we aren't loading data, don't change the visualization settings
  if (action.type !== DataTypes.LOAD_DATA) { return }

  const data = store.getState().data
  data.keySeq().forEach(visualization => {
    const visData = data.get(visualization)
    const amount = visData.keySeq().first()
    const yearScale = timelineYearScaleCalculation(visData.get(amount))
    const action = {
      type: visualizationSettingsTypes.RESET_VISUALIZATION,
      payload: {
        settings: {
          amount,
          arrangeBy: 'location',
          activity: 'importsExports',
          subtype: '',
          selection:{
            country: null,
            selectedMapPieces:[],
            highlightedMapPieces:{}
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
    store.dispatch(action)
  })
  /*
  const scale = timelineScaleSelector(store.getState())
  store.dispatch(timelineFilter('start', {
    year: scale.year.min,
    quarter: 1,
  }))
  */
}

module.exports = initialVisualizationSettings
