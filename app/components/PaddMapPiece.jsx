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
    return (<g transform={`translate(${this.props.left} ${this.props.top} )`} >
      <polygon
        fill={this.props.color}
        stroke={this.props.color}
        points="37.09 9.68 18.54 0 0 9.68 0 29.05 18.54 38.73 37.09 29.05 37.09 9.68"
      />
      <MapPieceLabel
        styleClass="paddMapPieceLabel"
        labelPosition={this.props.styles.get('labelPosition')}
        topMargin={this.props.styles.get('bottomMargin')}
        bottomMargin={this.props.styles.get('topMargin')}
        mapPieceWidth={this.props.dimensions.get('width')}
        mapPieceHeight={this.props.dimensions.get('height')}
        name={this.props.originKey}
        styleClass={this.props.mapPieceStyleClass}
        mapPieceProps={this.props.mapPieceProps}
      />
    </g>)
  }
}

export default PaddMapPiece
