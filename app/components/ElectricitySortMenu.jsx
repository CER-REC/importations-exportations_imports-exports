const React = require('react')
const ReactRedux = require('react-redux')

const Constants = require('../Constants.js')
const Tr = require('../TranslationTable.js')
const WorkspaceComputations = require('../computations/WorkspaceComputations.js')

const MenuBarOption = require('./MenuBarOption.jsx')

const { setArrangeBy } = require('../actions/visualizationSettings')
const { visualizationSettings } = require('../selectors/visualizationSettings')

require('./ElectricitySortMenu.scss')

class ElectricitySortMenu extends React.Component {

  render() {
    const titleYaxis = WorkspaceComputations.electricitySortMenuY() - 30
    return <g>
      <text x = {Constants.getIn(['electricitySortStatesStyle', 'title', 'import','xPadding'])}
        y = {titleYaxis} 
        fill={Constants.getIn(['electricitySortStatesStyle', 'title', 'import','color'])} 
        className='ElectricitySortMenuTitle'> 
        {Tr.getIn(['electricitySortStates', 'title', 'import',this.props.language])} 
      </text>
      <text x = {Constants.getIn(['electricitySortStatesStyle', 'title', 'ampersand','xPadding']) }
        y = {titleYaxis} className='ElectricitySortMenuTitle'> 
        {Tr.getIn(['electricitySortStates', 'title', 'ampersand',this.props.language])} 
      </text>
      <text x = {Constants.getIn(['electricitySortStatesStyle', 'title', 'export','xPadding']) }
        y = {titleYaxis} 
        fill= {Constants.getIn(['electricitySortStatesStyle', 'title', 'export','color']) } 
        className='ElectricitySortMenuTitle'> 
        {Tr.getIn(['electricitySortStates', 'title', 'export',this.props.language])}
      </text>
      <MenuBarOption 
        key='electricitySortStateMenu'
        yaxis = { WorkspaceComputations.electricitySortMenuY() }
        options = {Constants.get('electricitySortStates')}
        onOptionClick = {this.props.setArrangeBy.bind(this)}
        selectedOption = {this.props.arrangeBy}
        optionXaxisPadding = {Constants.getIn(['menuBarOptions', 'optionXaxisPadding'])}
        optionPadding = {Constants.getIn(['menuBarOptions', 'optionPadding'])}
        trKey = 'electricitySortStates' 
        color = {Constants.getIn(['electricitySortStatesStyle', 'color'])}
        lineWidth = {Constants.getIn(['electricitySortStatesStyle', 'lineWidth'])}
        language = {this.props.language}
      />
    </g>
  }
}

const mapStateToProps = (state, props) => {
  return {
    viewport: state.viewport,
    language: state.language,
    arrangeBy: visualizationSettings(state, props).get('arrangeBy'),
  }
}

const mapDispatchToProps = { setArrangeBy }

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(ElectricitySortMenu)
