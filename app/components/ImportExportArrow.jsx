import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Immutable from 'immutable'

import '../styles/Fonts.scss'

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

  breakLine(className, text, x, y){
    if (text.includes('\n')) {
      const splitName = text.split('\n')
      return (
        <text className={className} y={y - 17} aria-hidden>
          {splitName.map(text => <tspan key={text} x={x} dy="13">{text}</tspan>)}
        </text>
      )
    }
    return <text className={className} y={y} x={x}>{text}</text>
  }
  drawLabel(arrowProps, type) {
    let lineY = this.props.drawLabelLineY || 8
    let labelY = this.props.drawLabelLabelY || 12
    if (type === 'imports') {
      lineY = this.props.drawLabelLineImportY || -8
      labelY = this.props.drawLabelLabelImportY || -4
    }
    let labelElement = ''

    if (arrowProps) {
      const label = arrowProps.getIn([type, 'label', this.props.language])
      if (typeof label !== 'undefined' && label !== '') {
        labelElement = (
          <g>
            <line x1="18.5" y1={lineY} x2="45" y2={lineY} strokeWidth="1" stroke="#999999" />
            {this.breakLine('explanationLabel', label, 50, labelY)}
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
        topTextElement = this.breakLine('explanationTopText', topText, -5, y)
      }
    }
    return topTextElement
  }

  drawBottomText(arrowProps, type) {
    let y = 27
    if (type === 'imports') {
      y = 10
    }
    let bottomTextElement = ''
    if (arrowProps) {
      const bottomText = arrowProps.getIn([type, 'bottomText', this.props.language])
      if (typeof bottomText !== 'undefined' && bottomText !== '') {
        bottomTextElement = this.breakLine('explanationBottomText', bottomText, 3, y)
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
          style={{ transition: 'fill 1s ease' }}
        />
        {this.drawLabel(this.props.text, this.props.type)}
        {this.drawTopText(this.props.text, this.props.type)}
        {this.drawBottomText(this.props.text, this.props.type)}
      </g>
    )
  }
}

const mapStateToProps = ({ language }) => ({ language })
export default connect(mapStateToProps)(ImportExportArrow)
