const React = require('react')
const PropTypes = require('prop-types')

const ArrowTabLine = (props) => {
  const arrow = `M${props.xaxisPadding + 152} ${props.yaxis - 8} L${props.xaxisPadding + 144} ${props.yaxis + 3} L${props.xaxisPadding + 141} ${props.yaxis} Z`
  const titledLine = `M ${props.xaxisPadding + 140} ${props.yaxis + 5} l 9 -10`
  const straightLine = `M ${props.xaxisPadding} ${props.yaxis + 5} l 141 0`
  return (
    <g>
      <path
        d={titledLine}
        stroke={props.color}
        strokeWidth={props.lineWidth}
        fill={props.color}
      />
      <path
        d={straightLine}
        stroke={props.color}
        strokeWidth={props.lineWidth}
        fill={props.color}
      />
      <path d={arrow} fill={props.color} />
    </g>
  )
}

ArrowTabLine.propTypes = {
  xaxisPadding: PropTypes.number.isRequired,
  yaxis: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  lineWidth: PropTypes.string.isRequired,
}

module.exports = ArrowTabLine
