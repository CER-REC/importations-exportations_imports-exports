const React = require('react')
const ReactRedux = require('react-redux')
const PropTypes = require('prop-types')
const Immutable = require('immutable')

const ImportExportArrow = require('./ImportExportArrow.jsx')
const MapPieceLabel = require('./MapPieceLabel.jsx')
const ConfidentialIcon = require('./ConfidentialIcon.jsx')
const Constants = require('../Constants')
const AnimatedMapPiece = require('./SVGAnimation/AnimatedMapPiece')

class MapPiece extends React.Component {
  static propTypes = {
    bins: PropTypes.instanceOf(Immutable.List),
    styles: PropTypes.instanceOf(Immutable.Map).isRequired,
    dimensions: PropTypes.instanceOf(Immutable.Map).isRequired,
    data: PropTypes.instanceOf(Immutable.Map).isRequired,
    legend: PropTypes.bool,
  }

  static defaultProps = {
    bins: new Immutable.List(),
    legend: false,
  }

  getArrowColor(type, value) {
    if (this.props.legend) { return '#fff' }

    const index = this.props.bins.findIndex(range => range.get(0) < value && value < range.get(1))
    if (type === 'imports') {
      return Constants.getIn(
        ['styleGuide', 'importColours', index],
        Constants.getIn(['styleGuide', 'colours', 'ImportDefault']),
      )
    }
    return Constants.getIn(
      ['styleGuide', 'exportColours', index],
      Constants.getIn(['styleGuide', 'colours', 'ExportDefault']),
    )
  }

  drawArrow(legends, data, type, styles, arrowProps) {
    if (data.get(type) !== 0) {
      return (<ImportExportArrow
        arrowSpacing={styles.get('arrowSpacing')}
        type={type}
        color={this.getArrowColor(type, data.get(type))}
        arrowProps={arrowProps}
      />)
    }
    return ''
  }
   componentWillMount() {
     console.log(this.props.data.get('name'), this.props.x1, this.props.y1)
    
  }
  componentWillReceiveProps(props) {
    console.log(this.props.data.get('name'), this.props.x1, this.props.y1)
    console.log(props.data.get('name'), props.x1, props.y1)
  }


  render() {
    let arrowTransform = `translate(${Constants.getIn(['mapPieceArrowStyle', 'x'])}, ${Constants.getIn(['mapPieceArrowStyle', 'y'])})`
    if (this.props.styles.get('arrowPosition') === 'down') {
      arrowTransform = `translate(${Constants.getIn(['mapPieceArrowStyle', 'x'])}, ${this.props.dimensions.get('height') - Constants.getIn(['mapPieceArrowStyle', 'y'])})`
    }
    let confidentialIcon = ''
    if (typeof this.props.data.get('confidentialCount') !== 'undefined' && this.props.data.get('confidentialCount') !== 0) {
      // TODO: on click show pop over to show confidential values
      confidentialIcon = <ConfidentialIcon styles={this.props.styles.get('confidentialStyle')} />
    }

    let stroke = 'none'
    if (this.props.isMapPieceSelected === true) {
      stroke = 'black'
    }
    let opacity = 1
    if (this.props.isSelected === true && this.props.isMapPieceSelected === false) {
      opacity = 0.10
    }

    if (typeof this.props.mapPieceProps !== 'undefined'
      && typeof this.props.mapPieceProps.get('stroke') !== 'undefined'
      && this.props.mapPieceProps.get('stroke') !== '') {
      stroke = this.props.mapPieceProps.get('stroke')
    }
    return (<g fillOpacity={opacity} >
      <polygon
        stroke={stroke}
        fill={this.props.styles.get('color')}
        points="37.09 9.68 18.54 0 0 9.68 0 29.05 18.54 38.73 37.09 29.05 37.09 9.68"
      />
      <MapPieceLabel
        labelPosition={this.props.styles.get('labelPosition')}
        topMargin={this.props.styles.get('bottomMargin')}
        bottomMargin={this.props.styles.get('topMargin')}
        mapPieceHeight={this.props.dimensions.get('height')}
        name={this.props.data.get('name')}
        mapPieceProps={this.props.mapPieceProps}
      />
      <g transform={arrowTransform}>
        {this.drawArrow(this.props.legends, this.props.data, 'exports', this.props.styles, this.props.arrowProps)}
        {this.drawArrow(this.props.legends, this.props.data, 'imports', this.props.styles, this.props.arrowProps)}
      </g>
      {confidentialIcon}
      <AnimatedMapPiece
        x1= {this.props.x1 || 0}
        y1= {this.props.y1 || 0}
        x2= {this.props.x1 || 0}
        y2= {this.props.y1 || 0}
        id= {this.props.id}
        key= {this.props.id}
      />
      </g>)
  }
}


module.exports = MapPiece
