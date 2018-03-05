import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Immutable from 'immutable'

import Legend from './Legend'
import ShowExplanations from './ShowExplanations'
import ShowConfidentiality from './ShowConfidentiality'
import Menu from './Menu'
import VisualizationSelector from './VisualizationSelector'
import { visualizationSettings } from '../selectors/visualizationSettings'
import { setArrangeBy, setAmount, setActivity, setSubtype } from '../actions/visualizationSettings'
import { activityOptions, arrangeByOptions, amountOptions, subtypeOptions } from '../selectors/menus'
import {
  activityPosition,
  visSelectorPosition,
  arrangeByPosition,
  amountPosition,
  subtypePosition,
} from '../selectors/viewport/menus'
import TrSelector from '../selectors/translate'
import { positionShape } from '../propTypeShapes'

import './MenuBar.scss'

class MenuBar extends React.Component {
  static propTypes = {
    importExportVisualization: PropTypes.string.isRequired,
    activityPosition: PropTypes.shape(positionShape).isRequired,
    visSelectorPosition: PropTypes.shape(positionShape).isRequired,
    arrangeByPosition: PropTypes.shape(positionShape).isRequired,
    amountPosition: PropTypes.shape(positionShape).isRequired,
    subtypePosition: PropTypes.shape(positionShape).isRequired,
    activityOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
    arrangeByOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
    amountOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
    subtypeOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
    setActivity: PropTypes.func.isRequired,
    setArrangeBy: PropTypes.func.isRequired,
    setAmount: PropTypes.func.isRequired,
    setSubtype: PropTypes.func.isRequired,
    visualizationSettings: PropTypes.instanceOf(Immutable.Map).isRequired,
    Tr: PropTypes.func.isRequired,
  }

  renderActivityMenu() {
    const { Tr } = this.props
    const title = (this.props.visualizationSettings.get('activity') !== 'importsExports')
      ? null
      : {
        render: (
          <tspan>
            <tspan className="bold uppercase">{Tr(['menu', 'activity', 'options', 'imports'])}</tspan>
            &nbsp;{Tr(['menu', 'and'])}&nbsp;
            <tspan className="bold uppercase">{Tr(['menu', 'activity', 'options', 'exports'])}</tspan>
          </tspan>
        ),
        aria: [
          Tr(['menu', 'activity', 'options', 'imports']),
          Tr(['menu', 'and']),
          Tr(['menu', 'activity', 'options', 'exports']),
        ].join(' '),
      }
    return (
      <Menu
        {...this.props.activityPosition}
        options={this.props.activityOptions}
        selected={this.props.visualizationSettings.get('activity')}
        onChange={this.props.setActivity}
        title={title}
        name="activity"
      />
    )
  }

  renderNGLSubtypeMenu() {
    if (this.props.importExportVisualization !== 'naturalGasLiquids') { return null }
    const { Tr } = this.props
    const title = (this.props.visualizationSettings.get('subtype') !== '')
      ? null
      : {
        render: (
          <tspan>
            {Tr(['menu', 'subtype', 'prefix'])}&nbsp;
            <tspan className="bold uppercase">{Tr(['menu', 'subtype', 'options', 'Butane'])}</tspan>
            &nbsp;{Tr(['menu', 'and'])}&nbsp;
            <tspan className="bold uppercase">{Tr(['menu', 'subtype', 'options', 'Propane'])}</tspan>
          </tspan>
        ),
        aria: [
          Tr(['menu', 'subtype', 'options', 'Butane']),
          Tr(['menu', 'and']),
          Tr(['menu', 'subtype', 'options', 'Propane']),
        ].join(' '),
      }
    return (
      <Menu
        {...this.props.subtypePosition}
        options={this.props.subtypeOptions}
        selected={this.props.visualizationSettings.get('subtype')}
        onChange={this.props.setSubtype}
        title={title}
        name="subtype"
      />
    )
  }

  render() {
    return (
      <g className="MenuBar">
        {this.renderActivityMenu()}
        <VisualizationSelector
          {...this.props.visSelectorPosition}
        />
        <Menu
          {...this.props.arrangeByPosition}
          options={this.props.arrangeByOptions}
          selected={this.props.visualizationSettings.get('arrangeBy')}
          onChange={this.props.setArrangeBy}
          name="arrangeBy"
        />
        <Menu
          {...this.props.amountPosition}
          options={this.props.amountOptions}
          selected={this.props.visualizationSettings.get('amount')}
          onChange={this.props.setAmount}
          name="amount"
        />
        {this.renderNGLSubtypeMenu()}

        <g role="menu">
          <ShowExplanations />
          <ShowConfidentiality />
        </g>
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
  subtypeOptions: subtypeOptions(state, props),
  activityPosition: activityPosition(state, props),
  visSelectorPosition: visSelectorPosition(state, props),
  arrangeByPosition: arrangeByPosition(state, props),
  amountPosition: amountPosition(state, props),
  subtypePosition: subtypePosition(state, props),
  Tr: TrSelector(state, props),
})

export default connect(
  mapStateToProps,
  {
    setArrangeBy, setAmount, setActivity, setSubtype,
  },
)(MenuBar)
