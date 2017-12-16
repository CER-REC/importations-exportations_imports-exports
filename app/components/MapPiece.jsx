const React = require('react')
const ReactRedux = require('react-redux')

class MapPiece extends React.Component {
  render(){
    //intial x and y coordinates
    let xaxis = parseInt(this.props.xaxis)
    let yaxis = parseInt(this.props.yaxis)

    //Map Piece width and height
    const width = parseInt(this.props.dimensions.get('width'))
    const height = parseInt(this.props.dimensions.get('height'))

    console.log(this.props)
    //calculated x and y coordinate
    xaxis = xaxis + (this.props.position.get('x') * ( width + this.props.dimensions.get('xAxisPadding')))
    yaxis = yaxis + (this.props.position.get('y') * (height + this.props.dimensions.get('yAxisPadding')))

    //Mock data need to be replaced by actual content 
    return <g>
      <rect x={ xaxis } y = { yaxis } width={width} height={height} fill = {this.props.styles.get('color')}></rect>
      <text x={ xaxis + (width / 2 )  } y={ yaxis + (height / 2) } fill = "blue">{this.props.data.get('name')}</text>
      <text x= { xaxis + (width / 3) } y= { yaxis + (height / 5) } fill = "blue">{this.props.data.get('importData')}</text>
      <text x= { xaxis + (width / 3) } y= { yaxis + (height * 0.8) } fill = "blue">{this.props.data.get('exportData')}</text>
    </g>
  }
}


module.exports = MapPiece