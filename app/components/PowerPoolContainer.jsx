const React = require('react')
const ReactRedux = require('react-redux')

const Constants = require('../Constants.js')
const WorkspaceComputations = require('../computations/WorkspaceComputations.js')

class PowerPoolContainer extends React.Component {

	render(){
		return <g>
			<text x = {this.props.xaxis} y = {this.props.yaxis}>
	          Power Pool Container
	        </text>
		</g>
	}
}

const mapStateToProps = state => {
  return {
    viewport: state.viewport
  }
}


module.exports = ReactRedux.connect(mapStateToProps)(PowerPoolContainer)