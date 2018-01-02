const React = require('react')
const ReactRedux = require('react-redux')

const Constants = require('../Constants.js')
const Tr = require('../TranslationTable.js')
const WorkspaceComputations = require('../WorkspaceComputations.js')

require('./Header.scss')
require('../styles/Fonts.scss')

class Header extends React.Component {




}


const mapStateToProps = state => {
  return {
    viewport: state.viewport
  }
}


module.exports = ReactRedux.connect(mapStateToProps)(Header)