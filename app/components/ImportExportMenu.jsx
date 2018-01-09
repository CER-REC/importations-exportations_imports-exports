const React = require('react')
const ReactRedux = require('react-redux')

const Constants = require('../Constants.js')
const Tr = require('../TranslationTable.js')

const WorkspaceComputations = require('../computations/WorkspaceComputations.js')


require ('../styles/Fonts.scss')


class ImportExportMenu extends React.Component {

  controlArrowImage() {
    return <image
      height = {15}
      width = {15}
      x = { 0 }
      y = { 56 }
      xlinkHref = 'images/control_arrow.svg'
    />
  }

  showText() {
    return <g><text x = {13} y = { 68 } 
      className = 'selectableDropdown'> 
      <tspan> {Tr.getIn(['importExportMenu', 'imports', this.props.language])} </tspan>
      <tspan className = 'bodyText'> 
        {Tr.getIn(['importExportMenu', 'and', this.props.language])} </tspan> 
      <tspan className = 'selectableDropdown'> 
        {Tr.getIn(['importExportMenu', 'exports', this.props.language])}
      </tspan>
    </text>
    </g>
  }

  render() {
    return <g>
      {this.showText()}
      {this.controlArrowImage()}
    </g>
  }
}

const mapStateToProps = state => {
  return {
    viewport: state.viewport,
    language: state.language,
  }
}



module.exports = ReactRedux.connect(mapStateToProps)(ImportExportMenu)