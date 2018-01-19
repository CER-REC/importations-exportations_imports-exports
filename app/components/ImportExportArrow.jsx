const React = require('react')
const ReactRedux = require('react-redux')
const PropTypes = require('prop-types')
const Immutable = require('immutable')

require('../styles/Fonts.scss')

class ImportExportArrow extends React.Component {
  static propTypes = {
    language: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    arrowSpacing: PropTypes.number.isRequired,
    arrowProps: PropTypes.instanceOf(Immutable.Map),
    color: PropTypes.string.isRequired,
  }

  static defaultProps = {
    arrowProps: null,
  }

  drawLabel(arrowProps, type) {
    let lineY = 8
    let labelY = 8
    if (type === 'imports') {
      lineY = -8
      labelY = -8
    }
    let labelElement = ''

    if (arrowProps) {
      const label = arrowProps.getIn([type, 'label', this.props.language])
      if (typeof label !== 'undefined' && label !== '') {
        labelElement = (
          <g>
            <line x1="18.5" y1={lineY} x2="45" y2={lineY} strokeWidth="1" stroke="#999999" />
            <text className="explanationLabel" y={labelY} x="50" >
              {label}
            </text>
          </g>
        )
      }
    }
    return labelElement
  }

  drawTopText(arrowProps, type) {
    let y = -5
    if (type === 'imports') {
      y = -20
    }

    let topTextElement = ''
    if (arrowProps) {
      const topText = arrowProps.getIn([type, 'topText', this.props.language])
      if (typeof topText !== 'undefined' && topText !== '') {
        topTextElement = <text y={y}>{topText}</text>
      }
    }
    return topTextElement
  }

  drawBottomText(arrowProps, type) {
    let y = 25
    if (type === 'imports') {
      y = 10
    }
    let bottomTextElement = ''
    if (arrowProps) {
      const bottomText = arrowProps.getIn([type, 'bottomText', this.props.language])
      if (typeof bottomText !== 'undefined' && bottomText !== '') {
        bottomTextElement = <text y={y}>{bottomText}</text>
      }
    }
    return bottomTextElement
  }

  render() {
    let transform = 'rotate(0)'
    if (this.props.type === 'imports') {
      transform = `rotate(180, 18.75, ${this.props.arrowSpacing})`
    }
    transform += ' scale(1.2)'

    let stroke = 'none'
    if (this.props.arrowProps && this.props.arrowProps.get('stroke', '') !== '') {
      stroke = this.props.arrowProps.get('stroke')
    }

    return (
      <g>
        <polygon
          stroke={stroke}
          fill={this.props.color}
          transform={transform}
          points="30.46 4.09 15.17 11.38 0 4.07 0 3.41 2.75 3.41 2.76 0.01 28.03 0 28.05 3.41 30.47 3.42 30.46 4.09"
        />
        {this.drawLabel(this.props.arrowProps, this.props.type)}
        {this.drawTopText(this.props.arrowProps, this.props.type)}
        {this.drawBottomText(this.props.arrowProps, this.props.type)}
      </g>
    )
  }
}

const mapStateToProps = ({ language }) => ({ language })
module.exports = ReactRedux.connect(mapStateToProps)(ImportExportArrow)
