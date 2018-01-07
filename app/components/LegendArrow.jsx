const React = require('react')
const ReactRedux = require('react-redux')

const Constants = require('../Constants.js')

class LegendArrow extends React.Component {

  arrowSvg() {
    return <svg          
          x = {this.props.xPosition}
          y = {this.props.yPosition}
          height = {Constants.getIn(['legend','iconHeight'])}
          width = {Constants.getIn(['legend','iconHWidth'])}>
        <polygon 
          fill = {this.props.colour}
          points='0 8.3 15.3 0 30.47 8.32 30.47 
          8.97 27.71 8.97 27.71 12.38 2.44 12.38 2.42 
          8.97 0 8.97 0 8.3'/>
    </svg>
  }

  render() {
    return <g>
      { this.arrowSvg() }
    </g>
  }

}


const mapStateToProps = state => {
  return {
    viewport: state.viewport,
  }
}

module.exports = ReactRedux.connect(mapStateToProps)(LegendArrow)