const React = require('react')
const ReactRedux = require('react-redux')

const Constants = require('../Constants.js')
const Tr = require('../TranslationTable.js')

const WorkspaceComputations = require('../computations/WorkspaceComputations.js')


require ('../styles/Fonts.scss')


class ImportExportMenu extends React.Component {

  controlArrowImage() {
    return <image
      height = { Constants.getIn(['menuBar','controlArrowSize']) }
      width = { Constants.getIn(['menuBar','controlArrowSize']) }
      x = { 0 }
      y = { WorkspaceComputations.importExportMenuY(this.props.viewport) }
      xlinkHref = 'images/control_arrow.svg'
    />
  }

  showText() {
    return <g><text x = { Constants.getIn(['menuBar','textLabelOffset']) } 
      y = { WorkspaceComputations.importExportMenuY(this.props.viewport) 
        + Constants.getIn(['menuBar','importExportTextLabelYOffset']) } 
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