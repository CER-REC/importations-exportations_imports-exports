const React = require('react')
const ReactRedux = require('react-redux')
const ReactFauxDOM = require('react-faux-dom')
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
    //Create the element
    const g = new ReactFauxDOM.Element('g')
    
    //intial x and y coordinates
    const initialX = 0
    const intiailY = 0
   
    //Map Piece width and height
    //hexagon height : width = 9:10
    const width = parseInt(this.props.dimensions.get('width'))
    const height = parseInt(this.props.dimensions.get('height'))

    let lengthOfLine = Math.sqrt(((initialX -(initialX + width/2)) * (initialX -(initialX + width/2))) + 
                          (((intiailY+height/2) - intiailY)*((intiailY+height/2) - intiailY)))
    lengthOfLine = Math.round(lengthOfLine)

    var hexagonData = [  { "x": initialX,   "y": intiailY+ height/4} ,  { "x": initialX + width/2,  "y": intiailY},
                      { "x": initialX + width/2,  "y": intiailY}, { "x": initialX + width,  "y": intiailY+ height/4},
                      { "x": initialX + width,  "y": intiailY+ height/4},  { "x": initialX + width,  "y": lengthOfLine},
                      { "x": initialX + width,  "y": lengthOfLine},  { "x": initialX + width/2,  "y": intiailY+height},
                      { "x": initialX + width/2,  "y": intiailY+height},  { "x": initialX,   "y": lengthOfLine} ,
                      { "x": initialX,   "y": lengthOfLine}, { "x": initialX,   "y": intiailY+ height/4} 
                    ]
     var hexagon = D3.line()
        .x(function(d) { return d.x; })
        .y(function(d) { return d.y; })
        .curve(D3.curveBasis)

      D3.select(g).append("path")
        .attr("d", hexagon(hexagonData))
        .attr("fill", this.props.styles.get('color'))

      //append province Label
      D3.select(g).append("text")
        .attr("dx", initialX+width/2)
        .attr("dy", intiailY+height/2)
        .text(this.props.data.get('name'))

      //These will be replaced by the arrow polygon
      //append import data
       D3.select(g).append("text")
        .attr("dx", initialX + (width / 3) )
        .attr("dy", intiailY + (height / 5) )
        .attr('stroke', this.getArrowColor(this.props.legends, this.props.data.get('importData')).get('import'))
        .text(this.props.data.get('importData'))

      //append export data
      D3.select(g).append("text")
        .attr("dx", initialX + (width / 3) )
        .attr("dy", intiailY + (height * 0.8) )
        .attr('stroke', this.getArrowColor(this.props.legends, this.props.data.get('exportData')).get('export'))
        .text(this.props.data.get('exportData'))

    //DOM manipulations done, convert to React
    return g.toReact()
    
  }
}


module.exports = MapPiece