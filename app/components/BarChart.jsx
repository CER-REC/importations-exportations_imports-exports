import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Chart from './Chart'
import AnimatedLine from './SVGAnimation/AnimatedLine'
import AxisGuide from './AxisGuide'
import DetailSidebar from './DetailSidebar'
import DetailTotal from './DetailTotal'
import ConfidentialCount from './ConfidentialCount'
import { timelineGrouping, timelineData } from '../selectors/timeline'

class BarChart extends Chart {
  static get propTypes() {
    return Object.assign({}, super.propTypes, {
      valueKey: PropTypes.string.isRequired,
    })
  }

  constructor(props) {
    super(props)
    this.state = {
      axisGuide: props.trueScale.get('max'),
    }

    this.updateAxisGuide = this.updateAxisGuide.bind(this)
  }

  componentWillReceiveProps(props) {
    // Reset the axis guide when the scale changes.
    // Watch scale since that changes the bar height, but use trueScale in order
    // to put the guide on top of the tallest bar
    if (props.scale.getIn(['y', 'max']) !== this.props.scale.getIn(['y', 'max'])) {
      this.updateAxisGuide(props.trueScale.get('max'))
    }
  }

  updateAxisGuide(position) {
    this.setState({ axisGuide: position })
  }

  render() {
    const {
      bars: data,
      scale,
      height,
      flipped,
      valueKey,
      colour,
      layout,
    } = this.props
    if (data.count() === 0) { return null }

    const barSize = layout.get('barWidth')

    const heightPerUnit = height / (scale.getIn(['y', 'max']) - scale.getIn(['y', 'min']))
    const elements = data.map((point) => {
      const opacity = this.isTimelinePointFiltered(point) ? 0.5 : 1
      return (
        <AnimatedLine
          x1={point.get('offsetX')}
          x2={point.get('offsetX')}
          y2={height}
          y1={height - (point.getIn(['values', valueKey], 0) * heightPerUnit)}
          key={`${point.get('year')}-${point.get('quarter')}-${valueKey}`}
          strokeWidth={barSize}
          stroke={colour}
          opacity={opacity}
          animate={{ y1: '1s' }}
        />
      )
    }).toArray()

    const sidebarContent = [
      <ConfidentialCount
        key="confidential"
        valueKey={this.props.valueKey}
        aggregateKey={this.props.aggregateKey}
      />,
      <DetailTotal
        key="total"
        type={flipped ? 'exports' : 'imports'}
        valueKey={this.props.valueKey}
        aggregateKey={this.props.aggregateKey}
      />,
    ]

    return (
      <g transform={this.getTransform()}>
        <g>{elements}</g>
        <AxisGuide
          flipped={flipped}
          scale={scale.get('y').toJS()}
          position={this.state.axisGuide}
          chartHeight={height}
          heightPerUnit={heightPerUnit}
          updatePosition={this.updateAxisGuide}
          width={this.props.width}
          barSize={barSize}
        />
        <DetailSidebar top={this.props.top} height={height}>
          {flipped ? sidebarContent.reverse() : sidebarContent}
        </DetailSidebar>
      </g>
    )
  }
}

export default connect((state, props) => Object.assign({
  timelineGroup: timelineGrouping(state, props),
}, timelineData(state, props)))(BarChart)
