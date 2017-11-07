const React = require('react')
const ReactRedux = require('react-redux')

const Constants = require('../Constants.js')
const WorkspaceComputations = require('../computations/WorkspaceComputations.js')

require('./SocialBar.scss')

class SocialBar extends React.Component {

  render() {
    return <g>
      <rect 
        x = { 0 }
        y = { WorkspaceComputations.socialBarY(this.props.viewport) }
        width = { Constants.getIn(['socialBar','width']) }
        height = { Constants.getIn(['socialBar','height']) }
        fill = '#C1C5A3' 
      />
    </g>
  }
}

const mapStateToProps = state => {
  return {
    viewport: state.viewport
  }
}


module.exports = ReactRedux.connect(mapStateToProps)(SocialBar)