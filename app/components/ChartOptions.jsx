import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import './ChartOptions.scss'
import Constants from '../Constants'
import { setScaleLinked, setGrouping } from '../actions/visualizationSettings'
import { timelineScaleLinked, timelineGrouping as timelineGroupingSelector } from '../selectors/timeline'
import trSelector from '../selectors/translate'
import { handleInteraction } from '../utilities'

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
    }
  }

  static get defaultProps() {
    return {
      canChangeScale: true,
    }
  }

  linkDataExplanation() {
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
        xPosition={49}
        yPosition={7}
        lineX={142.16}
        lineY={173.94}
        textX={40}
        textY={58}
        containerX={leftPad + 880}
        containerY={300}
        name="linkDataIcon"
        text={`${this.props.tr(['explanations','linkedDataIcon'])}`}
    /></g>)
  }

  scaleLinkedChanged = () => this.props.setScaleLinked(!this.props.scaleLinked)

  changeTimelineGroup = () =>
    this.props.setGrouping(this.props.timelineGroup === 'year' ? 'quarter' : 'year')

  renderScaleToggle() {
    if (this.props.canChangeScale === false) { return null }

    const image = this.props.scaleLinked
      ? 'images/link.svg'
      : 'images/link_broken.svg'
    const imageAlt = this.props.scaleLinked
      ? this.props.tr(['chartOptions', 'scaleLinked'])
      : this.props.tr(['chartOptions', 'scaleUnlinked'])

    const interactions = handleInteraction(this.scaleLinkedChanged)
    const switchHeight = this.props.height - 4
    return (
      <label
        htmlFor="scaleLinked"
        className="switchWrapper"
        {...interactions}
      >
        <div className="switch" style={{ width: switchHeight * 2, height: switchHeight }}>
          <input
            type="checkbox"
            id="scaleLinked"
            checked={this.props.scaleLinked}
            onChange={interactions.onClick}
          />
          <div className="switchBackground round">
            <div className="slider" />
            <svg>
          {this.linkDataExplanation()}
        </svg>
          </div>
        </div>
        <img src={image} height={switchHeight} alt={imageAlt} />
      </label>
    )
  }

  render() {
    const groupLabel = this.props.tr(['chartOptions', 'timelineGroup', this.props.timelineGroup])
    const leftPad = Constants.getIn(['visualizationDetailContainer', 'leftPadding'])
    return (
      <div
        style={{
          height: '100%',
          background: Constants.getIn(['styleGuide', 'colours', 'SandLight']),
          lineHeight: `${this.props.height}px`,
          marginLeft: `${-leftPad}px`,
          paddingLeft: `${leftPad}px`,
        }}
      >
        {this.renderScaleToggle()}
        <div className="chartOptions">
          <a
            {...handleInteraction(this.changeTimelineGroup)}
            aria-label={groupLabel}
          >
            {groupLabel} +
          </a>
          <div className="detailBarArrow" />
        </div>
        <div style={{ clear: 'both' }} />
      </div>
    )
  }
}

export default connect(
  (state, props) => ({
    scaleLinked: timelineScaleLinked(state, props),
    timelineGroup: timelineGroupingSelector(state, props),
    tr: trSelector(state, props),
  }),
  { setScaleLinked, setGrouping },
)(ChartOptions)
