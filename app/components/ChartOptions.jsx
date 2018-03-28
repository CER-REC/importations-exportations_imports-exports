import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import './ChartOptions.scss'
import * as ScaleIcon from './ScaleIcon'
import Constants from '../Constants'
import { setScaleLinked, setGrouping } from '../actions/visualizationSettings'
import { timelineScaleLinked } from '../selectors/timeline'
import { groupingBy as timelineGroupingSelector } from '../selectors/data'
import trSelector from '../selectors/translate'
import { handleInteractionWithTabIndex } from '../utilities'
import {visualizationSettings} from '../selectors/visualizationSettings'

import ExplanationDot from './ExplanationDot'
import tr from '../TranslationTable'

class ChartOptions extends React.PureComponent {
  static get propTypes() {
    return {
      setScaleLinked: PropTypes.func.isRequired,
      setGrouping: PropTypes.func.isRequired,
      canChangeScale: PropTypes.bool,
      scaleLinked: PropTypes.bool.isRequired,
      timelineGroup: PropTypes.string.isRequired,
      height: PropTypes.number.isRequired,
      tabIndex: PropTypes.number,
    }
  }

  static get defaultProps() {
    return {
      canChangeScale: true,
      tabIndex:0,
    }
  }

  linkDataExplanation() {
    if (this.props.selectedEnergy !== 'electricity' || this.props.activityGroup.get('activity') !== 'importsExports') { return }
    const leftPad = Constants.getIn(['visualizationDetailContainer', 'leftPadding'])
    return (<g>
      <ExplanationDot
        scale="scale(1)"
        lineStroke="1"
        textBoxWidth={140}
        linePath="
          M142.16,
          173.94l24.26,
          36.69a40.12,
          40.12,0,0,0,
          33.47,
          18H322.2"
        xPosition={21}
        yPosition={17}
        lineX={142.16}
        lineY={173.94}
        textX={40}
        textY={58}
        containerX={leftPad + 890}
        containerY={314}
        name="linkDataIcon"
        text={`${this.props.tr(['explanations','linkedDataIcon'])}`}
    /></g>)
  } 

  scaleLinkedChanged = () => this.props.setScaleLinked(!this.props.scaleLinked)

  changeTimelineGroup = () =>
    this.props.setGrouping(this.props.timelineGroup === 'year' ? 'quarter' : 'year')

  renderScaleToggle() {
    if (this.props.canChangeScale === false || this.props.activityGroup.get('activity') !== 'importsExports') { return null }

    const interactions = handleInteractionWithTabIndex(this.props.tabIndex, this.scaleLinkedChanged)
    const switchHeight = this.props.height
    const imageProps = {
      fill: Constants.getIn(['styleGuide', 'colours', 'SandExtraDark']),
      height: switchHeight,
      onChange: interactions.onClick,
    }
    return (
      <div
        className="chartScaleLinked"
        {...interactions}
      >
        <svg height={switchHeight} width={switchHeight}>
          {this.props.scaleLinked
            ? <ScaleIcon.ToggleLinked {...imageProps} />
            : <ScaleIcon.ToggleUnlinked {...imageProps} />}
        </svg>
        <div>
          ({this.props.tr(['chartOptions', (this.props.scaleLinked ? 'scaleLinked' : 'scaleUnlinked')])})
        </div>
      </div>
    )
  }

  render() {
    const groupLabel = this.props.tr(['chartOptions', 'timelineGroup', this.props.timelineGroup])
    const leftPad = Constants.getIn(['visualizationDetailContainer', 'leftPadding'])
    return (
      <div
        style={{
          background: Constants.getIn(['styleGuide', 'colours', 'SandLight']),
          lineHeight: `${this.props.height}px`,
          marginLeft: `${-leftPad}px`,
          paddingLeft: `${leftPad}px`,
        }}
        className="chartOptionsWrapper"
      >        
        {this.renderScaleToggle()}
        <div className="chartOptions">
          {/* Using a div to fix an IE11 bug with the detail bar arrow wrapping */}
          <div className="detailGroupToggle">
            <a
              {...handleInteractionWithTabIndex(this.props.tabIndex, this.changeTimelineGroup)}
              aria-label={groupLabel}
            >
              {groupLabel} +
            </a>
          </div>
          <div className="detailBarArrow" />
        </div>                          
        <svg style={{ zIndex: 99 }}>{this.linkDataExplanation()}</svg>
      </div>
    )
  }
}

export default connect(
  (state, props) => ({
    selectedEnergy: state.importExportVisualization,
    scaleLinked: timelineScaleLinked(state, props),
    activityGroup: visualizationSettings(state, props),
    timelineGroup: timelineGroupingSelector(state, props),
    tr: trSelector(state, props),
  }),
  { setScaleLinked, setGrouping },
)(ChartOptions)
