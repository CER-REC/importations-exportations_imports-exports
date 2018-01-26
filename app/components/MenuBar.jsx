import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Immutable from 'immutable'

import Legend from './Legend'
import ShowExplanations from './ShowExplanations'
import ShowConfidentiality from './ShowConfidentiality'
import NglSubproductMenu from './NglSubproductMenu'
import Menu from './Menu'
import VisualizationSelector from './VisualizationSelector'
import { visualizationSettings } from '../selectors/visualizationSettings'
import { setArrangeBy, setAmount, setActivity, setSubtype } from '../actions/visualizationSettings'
import { activityOptions, arrangeByOptions, amountOptions } from '../selectors/menus'
import { activityPosition, visSelectorPosition, arrangeByPosition, amountPosition } from '../selectors/viewport/menus'
import { positionShape } from '../propTypeShapes'

import './MenuBar.scss'

class MenuBar extends React.Component {
  static propTypes = {
    activityPosition: PropTypes.shape(positionShape).isRequired,
    visSelectorPosition: PropTypes.shape(positionShape).isRequired,
    arrangeByPosition: PropTypes.shape(positionShape).isRequired,
    amountPosition: PropTypes.shape(positionShape).isRequired,
    activityOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
    arrangeByOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
    amountOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
    setActivity: PropTypes.func.isRequired,
    setArrangeBy: PropTypes.func.isRequired,
    setAmount: PropTypes.func.isRequired,
    visualizationSettings: PropTypes.instanceOf(Immutable.Map).isRequired,
  }

  render() {
    return (
      <g className="MenuBar">
        <Menu
          {...this.props.activityPosition}
          options={this.props.activityOptions}
          selected={this.props.visualizationSettings.get('activity')}
          onChange={this.props.setActivity}
          title={<tspan><tspan className="bold">IMPORTS</tspan> and <tspan className="bold">EXPORTS</tspan></tspan>}
          name="activity"
        />
        <VisualizationSelector
          {...this.props.visSelectorPosition}
        />
        <Menu
          {...this.props.arrangeByPosition}
          options={this.props.arrangeByOptions}
          selected={this.props.visualizationSettings.get('arrangeBy')}
          onChange={this.props.setArrangeBy}
          title={<tspan>arranged by <tspan className="bold">{this.props.visualizationSettings.get('arrangeBy')}</tspan></tspan>}
          name="arrangeBy"
        />
        <Menu
          {...this.props.amountPosition}
          options={this.props.amountOptions}
          selected={this.props.visualizationSettings.get('amount')}
          onChange={this.props.setAmount}
          title={<tspan>showing <tspan className="bold">Amount ({this.props.visualizationSettings.get('amount')})</tspan></tspan>}
          name="amount"
        />
        <NglSubproductMenu />

        <ShowExplanations />
        <ShowConfidentiality />
        <Legend />
      </g>
    )
  }
}

const mapStateToProps = (state, props) => ({
  viewport: state.viewport,
  importExportVisualization: state.importExportVisualization,
  visualizationSettings: visualizationSettings(state, props),
  activityOptions: activityOptions(state, props),
  arrangeByOptions: arrangeByOptions(state, props),
  amountOptions: amountOptions(state, props),
  activityPosition: activityPosition(state, props),
  visSelectorPosition: visSelectorPosition(state, props),
  arrangeByPosition: arrangeByPosition(state, props),
  amountPosition: amountPosition(state, props),
})

module.exports = connect(
  mapStateToProps,
  { setArrangeBy, setAmount, setActivity, setSubtype },
)(MenuBar)
