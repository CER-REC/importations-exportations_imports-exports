const React = require('react')
const ReactRedux = require('react-redux')
const ReactFauxDOM = require('react-faux-dom')

const ImportExportArrow = require('./ImportExportArrow.jsx')
const MapPieceLabel = require('./MapPieceLabel.jsx')
const D3 = require('d3')

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
    //map piece arrow
    const exportArrow = <ImportExportArrow
                          arrowPosition = {this.props.styles.get('arrowPosition')} 
                          color='red'
                          />
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
        {exportArrow}
      </g>
  }
}


module.exports = MapPiece