const React = require('react')

const TextBox = require('./TextBox')
const SVGDrag = require('./SVGDrag/')

class AxisGuide extends React.PureComponent {
  static get defaultProps() {
    return {
      flipped: false,
    }
  }

  adjustOffset(offset) {
    return {
      x: 0,
      y: offset.y,
    }
  }

  dragStop(offset) {
    console.info('Drag stopped', offset)
  }

  render() {
    return (
      <SVGDrag
        flipped={this.props.flipped}
        adjustOffset={this.adjustOffset}
        dragStop={this.dragStop}
      >
        <polyline
          strokeWidth={1}
          stroke="black"
          points="-12,150 -7,140 -2,150 -7,160 -12,150"
          fill="transparent"
        />
        <line
          x1={-2}
          x2={242}
          y1={150}
          y2={150}
          strokeWidth={1}
          stroke="black"
          strokeDasharray="4, 2"
        />

        <TextBox
          textStyles={{
            x: 120,
            y: 144,
            textAnchor: 'middle',
            alignmentBaseline: 'bottom',
          }}
          boxStyles={{
            fill: 'olive',
          }}
          padding={2}
          flipped={this.props.flipped}
        >
          6,200,000 MW.h
        </TextBox>
      </SVGDrag>
    )
  }
}

module.exports = AxisGuide
