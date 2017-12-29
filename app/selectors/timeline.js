const createSelector = require('reselect').createSelector
const fromJS = require('immutable').fromJS

const sortTimelineSelector = require('./data').sortTimelineSelector
const visualizationWidth = require('./viewport').visualizationContainerWidth
const Constants = require('../Constants.js')

const timelineGrouping = state => state.ui.get('timelineGroup')
const timelineRange = state => state.ui.get('timelineRange')

const timelineScaleSelector = createSelector(
  sortTimelineSelector,
  data => {
    const scale = {
      import: {
        min: 0,
        max: -Number.MAX_SAFE_INTEGER,
      },
      export: {
        min: 0,
        max: -Number.MAX_SAFE_INTEGER,
      },
      year: {},
    }

    const years = data.map(point => {
      scale.import.min = Math.min(scale.import.min, point.get('imports'))
      scale.import.max = Math.max(scale.import.max, point.get('imports'))
      scale.export.min = Math.min(scale.export.min, point.get('exports'))
      scale.export.max = Math.max(scale.export.max, point.get('exports'))
      return point.get('year')
    }).toSet().toArray() // toSet to keep unique values

    scale.year.min = Math.min(...years)
    scale.year.max = Math.max(...years)

    return scale
  }
)

const timelinePositionSelector = createSelector(
  sortTimelineSelector,
  timelineScaleSelector,
  timelineGrouping,
  visualizationWidth,
  (points, scale, grouping, width) => {
    const groupPadding = Constants.getIn(['timeline', 'groupPadding'])
    const barPadding = Constants.getIn(['timeline', 'barPadding'])
    if (grouping === 'year') {
      const totalYears = (scale.year.max - scale.year.min)
      const widthAfterPads = width
        - (totalYears * groupPadding)
        - ((totalYears * 4) * barPadding)
      const barWidth = widthAfterPads / ((totalYears + 1) * 4)

      let offset = 0
      let lastPoint
      const labels = []
      const bars = points.map(point => {
        if (!lastPoint || lastPoint.get('year') !== point.get('year')) {
          if (lastPoint) { offset += groupPadding }
          labels.push({
            // Add two bars width, and then subtract half a bar for centering
            offsetX: offset + (barWidth + barPadding) * 2 - (barWidth / 2),
            label: point.get('year').toString().substr(-2),
          })
        }
        const newPoint = point.set('offsetX', offset)
        offset += barPadding + barWidth
        lastPoint = newPoint
        return newPoint
      })
      return fromJS({
        bars,
        labels,
        scale,
        layout: {
          width,
          groupPadding,
          barPadding,
          barWidth,
        },
      })
    }
  }
)

const timelineSeekPositionSelector = createSelector(
  timelinePositionSelector,
  timelineRange,
  (data, range) => {
    const bars = data.get('bars')
    const start = bars.find(point => (
      point.get('year') >= range.getIn(['start', 'year']) &&
      point.get('quarter') >= range.getIn(['start', 'quarter'])
    ))
    const end = bars.findLast(point => (
      point.get('year') <= range.getIn(['end', 'year']) &&
      point.get('quarter') <= range.getIn(['end', 'quarter'])
    ))
    return {
      start: start.get('offsetX'),
      end: end.get('offsetX'),
    }
  }
)

module.exports = {
  timelinePositionSelector,
  timelineSeekPositionSelector,
  timelineRange,
}
