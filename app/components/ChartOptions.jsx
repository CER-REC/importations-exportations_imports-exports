import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Constants from '../Constants'
import { setScaleLinked, setGrouping } from '../actions/visualizationSettings'
import TimelineSelector from '../selectors/timeline'
import { handleInteraction } from '../utilities'

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

  scaleLinkedChanged = () => this.props.setScaleLinked(!this.props.scaleLinked)

  changeTimelineGroup = () =>
    this.props.setGrouping(this.props.timelineGroup === 'year' ? 'quarter' : 'year')

  renderScaleToggle() {
    if (this.props.canChangeScale === false) { return null }

    const image = this.props.scaleLinked
      ? 'images/link.svg'
      : 'images/link_broken.svg'
    const imageAlt = this.props.scaleLinked
      ? 'Chart Scale Linked'
      : 'Chart Scale Unlinked'

    const interactions = handleInteraction(this.scaleLinkedChanged)
    return (
      <label htmlFor="scaleLinked" {...interactions}>
        <div className="switch">
          <input
            type="checkbox"
            id="scaleLinked"
            checked={this.props.scaleLinked}
            onChange={interactions.onClick}
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
          <a
            {...handleInteraction(this.changeTimelineGroup)}
            aria-label={`by ${this.props.timelineGroup}`}
          >
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
