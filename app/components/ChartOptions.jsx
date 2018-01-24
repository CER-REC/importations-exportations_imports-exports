import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Constants from '../Constants'
import { setScaleLinked, setGrouping } from '../actions/visualizationSettings'
import TimelineSelector from '../selectors/timeline'

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

  constructor(props) {
    super(props)
    this.scaleLinkedChanged = this.scaleLinkedChanged.bind(this)
    this.changeTimelineGroup = this.changeTimelineGroup.bind(this)
  }

  scaleLinkedChanged(e) {
    // FIXME: Controlled checkbox doesn't seem to be working properly. If I
    // prevent the default action for the event, the checkbox takes two clicks
    this.props.setScaleLinked(e.target.checked)
  }

  changeTimelineGroup(e) {
    e.preventDefault()
    this.props.setGrouping(this.props.timelineGroup === 'year' ? 'quarter' : 'year')
  }

  renderScaleToggle() {
    if (this.props.canChangeScale === false) { return null }

    const image = this.props.scaleLinked
      ? 'images/link.svg'
      : 'images/link_broken.svg'
    const imageAlt = this.props.scaleLinked
      ? 'Chart Scale Linked'
      : 'Chart Scale Unlinked'

    return (
      <label htmlFor="scaleLinked">
        <div className="switch">
          <input
            type="checkbox"
            id="scaleLinked"
            checked={this.props.scaleLinked}
            onChange={this.scaleLinkedChanged}
          />
          <div className="slider round" />
        </div>
        <img src={image} height="20" alt={imageAlt} />
      </label>
    )
  }

  render() {
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: Constants.getIn(['styleGuide', 'colours', 'SandLight']),
          lineHeight: `${this.props.height}px`,
        }}
      >
        {this.renderScaleToggle()}
        <div className="chartOptions" style={{ float: 'right' }}>
          <a onClick={this.changeTimelineGroup}>
            by {this.props.timelineGroup.toUpperCase()} +
          </a>
          <div className="detailBarArrow" />
        </div>
        <div style={{ clear: 'both' }} />
      </div>
    )
  }
}

module.exports = connect(
  (state, props) => ({
    scaleLinked: TimelineSelector.timelineScaleLinked(state, props),
    timelineGroup: TimelineSelector.timelineGrouping(state, props),
  }),
  { setScaleLinked, setGrouping },
)(ChartOptions)
