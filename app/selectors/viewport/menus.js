import { createSelector } from 'reselect'

// TODO: Temporary
//import { chartAxisPosition } from './electricity'
const chartAxisPosition = () => ({ top: 0 })
import { activityOptions, arrangeByOptions, amountOptions, subtypeOptions } from '../menus'
import Constants from '../../Constants'

const menuHeightCalc = name => (prev, active, options) => ({
  ...prev,
  top: prev.top + prev.height,
  height: (
    Constants.getIn(['menuBar', 'barHeight']) +
    Constants.getIn(['menuBar', 'verticalPadding']) +
    ((active === name) ? ((options.length - 1) * Constants.getIn(['menuBar', 'optionHeight'])) : 0)
  ),
})

const activeMenu = state => state.activeMenu

const basePosition = () => ({
  top: 54,
  left: 0,
  width: Constants.getIn(['menuBar', 'width']),
  height: 0,
})

export const activityPosition = createSelector(
  basePosition,
  activeMenu,
  activityOptions,
  menuHeightCalc('activity'),
)

export const visSelectorPosition = createSelector(
  activityPosition,
  prev => ({
    ...prev,
    top: prev.top + prev.height - 2,
    height: (
      (Constants.getIn(['menuBar', 'visualizationPadding']) * 6) + 52
    ),
  }),
)

export const arrangeByPosition = createSelector(
  visSelectorPosition,
  activeMenu,
  arrangeByOptions,
  menuHeightCalc('arrangeBy'),
)

export const amountPosition = createSelector(
  arrangeByPosition,
  activeMenu,
  amountOptions,
  menuHeightCalc('amount'),
)

export const subtypePosition = createSelector(
  amountPosition,
  activeMenu,
  subtypeOptions,
  menuHeightCalc('subtype'),
)

export const explanationTogglePosition = createSelector(
  subtypePosition,
  chartAxisPosition,
  (prev, chart) => ({
    ...prev,
    //top: chart.top - 5,
    top: prev.top + 150,
    height: 20,
  }),
)

export const confidentialityTogglePosition = createSelector(
  explanationTogglePosition,
  prev => ({
    ...prev,
    top: prev.top + prev.height,
    height: 20,
  }),
)

export const legendMapPosition = createSelector(
  confidentialityTogglePosition,
  prev => ({
    ...prev,
    top: prev.top + prev.height,
    height: 120,
  }),
)

export const legendBinsPosition = createSelector(
  legendMapPosition,
  prev => ({
    ...prev,
    top: prev.top + prev.height + 20,
    height: 120,
  }),
)
