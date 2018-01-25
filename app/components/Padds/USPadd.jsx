const React = require('react')
const ReactRedux = require('react-redux')
const PropTypes = require('prop-types')
import PaddOne from './PaddOne'

const USPadd = props => (
	<g transform = {`translate(${props.top} ${props.left})`}>
		<PaddOne color="red" arrowLabel="Padd1"/>
	</g>
)
const mapStateToProps = state => ({
  viewport: state.viewport,
})

module.exports = ReactRedux.connect(mapStateToProps)(USPadd)
