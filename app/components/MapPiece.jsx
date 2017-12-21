const React = require('react')
const ReactRedux = require('react-redux')
const Constants = require('../Constants.js')

const ImportExportArrow = require('./ImportExportArrow.jsx')
const MapPieceLabel = require('./MapPieceLabel.jsx')

class MapPiece extends React.Component {

  getArrowColor(legends, value){
      return legends.find(data => {
        if(data.get('lower') < value && data.get('upper') === 'NA'){
          return true
        }
        if(data.get('lower') < value && data.get('upper') >= value ){
          return true
        }
      }) 
  }

  render(){

    let arrowTransform = `translate(${Constants.getIn(['mapPieceArrowStyle', 'x'])}, ${Constants.getIn(['mapPieceArrowStyle', 'y'])})`
    if(this.props.styles.get('arrowPosition') == 'down'){
      arrowTransform = `translate(${Constants.getIn(['mapPieceArrowStyle', 'x'])}, ${this.props.dimensions.get('height') - Constants.getIn(['mapPieceArrowStyle', 'y'])})`   
    }
    return <g>
        <polygon 
          fill={this.props.styles.get('color')} 
          points="37.09 9.68 18.54 0 0 9.68 0 29.05 18.54 38.73 37.09 29.05 37.09 9.68"/>
        <MapPieceLabel
          labelPosition = {this.props.styles.get('labelPosition')} 
          topMargin = {this.props.styles.get('bottomMargin')} 
          bottomMargin = {this.props.styles.get('topMargin')} 
          mapPieceHeight = {this.props.dimensions.get('height')}
          name = {this.props.data.get('name')}
        />
        <g transform={arrowTransform}>
          <ImportExportArrow
            arrowSpacing = {this.props.styles.get('arrowSpacing')}
            type = 'export' 
            color = {this.getArrowColor(this.props.legends, this.props.data.get('exportData')).get('export')}
            />
          <ImportExportArrow
            arrowSpacing = {this.props.styles.get('arrowSpacing')}
            type = 'import' 
            color = {this.getArrowColor(this.props.legends, this.props.data.get('importData')).get('import')}
            />
          </g>
      </g>
  }
}


module.exports = MapPiece