const React = require('react')
const { connect } = require('react-redux')

const { detailSidebarOffset } = require('../selectors/viewport')

const DetailSidebar = props => (
  <g transform={`translate(${props.offset} ${props.y})`}>
    {props.children}
  </g>
)

DetailSidebar.defaultProps = {
  y: 0,
}

module.exports = connect(
  state => ({ offset: detailSidebarOffset(state) })
)(DetailSidebar)
