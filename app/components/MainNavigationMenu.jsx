const React = require('react')
const ReactRedux = require('react-redux')

const Constants = require('../Constants.js')
const WorkspaceComputations = require('../computations/WorkspaceComputations.js')

require('./MainNavigationMenu.scss')

class MainNavigationMenu extends React.Component {

 render() {
    return <rect
      x = { 0 }
      y = { WorkspaceComputations.topHeightMargin() }
      width = { Constants.getIn(['menuBar','width']) }
      height = { Constants.getIn(['mainNavigationMenu','height'])  }
      fill = '#dcb5e0' 
    />
  }

}





const mapStateToProps = state => {
  return {
    viewport: state.viewport
  }
}




module.exports = ReactRedux.connect(mapStateToProps)(MainNavigationMenu)