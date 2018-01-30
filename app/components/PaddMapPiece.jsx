import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'

import MapPieceLabel from './MapPieceLabel'

class PaddMapPiece extends React.Component {
  static propTypes = {
    bins: PropTypes.instanceOf(Immutable.List),
    styles: PropTypes.instanceOf(Immutable.Map).isRequired,
    dimensions: PropTypes.instanceOf(Immutable.Map).isRequired,
    originKey: PropTypes.string,
    legend: PropTypes.bool,
  }

  static defaultProps = {
    bins: new Immutable.List(),
    legend: false,
  }

  render() {

    let opacity = 1
    if (typeof this.props.isSelected ==='defined' && this.props.isSelected === true && this.props.isMapPieceSelected === false) {
      opacity = 0.10
    }
    return (<g fillOpacity={opacity} transform={`translate(${this.props.left} ${this.props.top} )`} >
      <polygon
        fill={this.props.color}
        points="37.09 9.68 18.54 0 0 9.68 0 29.05 18.54 38.73 37.09 29.05 37.09 9.68"
      />
      <MapPieceLabel
        labelPosition={this.props.styles.get('labelPosition')}
        topMargin={this.props.styles.get('bottomMargin')}
        bottomMargin={this.props.styles.get('topMargin')}
        mapPieceHeight={this.props.dimensions.get('height')}
        name={this.props.originKey}
        mapPieceProps={this.props.mapPieceProps}
      />
      </g>)
  }
}

module.exports = PaddMapPiece
