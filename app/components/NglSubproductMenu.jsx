const React = require('react')
const ReactRedux = require('react-redux')

const Constants = require('../Constants.js')
const Tr = require('../TranslationTable.js')
const WorkspaceComputations = require('../computations/WorkspaceComputations.js')

const MenuBarOption = require('./MenuBarOption.jsx')

class NglSubproductMenu extends React.Component {
  constructor(props) {
    super(props)
    this.onClick = this.dropDownClick.bind(this)
  }

  controlArrowImage() {
    return <rect 
      x={ 0 } 
      y= { WorkspaceComputations.importExportMenuY(this.props.viewport) + 
          Constants.getIn(['menuBar','nglMenuYMargin']) } 
      width={ 5} 
      height={ 16 }
      fill = '#666666'
    />
  }

  subproductText() {
    return <g>
      <text x = { Constants.getIn(['menuBar','textLabelOffset']) } 
        y = {Constants.getIn(['menuBar','nglSubproductTextY'])}
        className = 'bodyText'>
        { Tr.getIn(['nglSubproductMenu','of',this.props.language]) }
        <tspan className = 'selectableDropdown'> { Tr.getIn(['nglSubproductMenu','butane',this.props.language]) } </tspan>
        <tspan> { Tr.getIn(['nglSubproductMenu','and',this.props.language]) }</tspan>
        <tspan className = 'selectableDropdown'> { Tr.getIn(['nglSubproductMenu','propane',this.props.language]) }</tspan>
        <tspan className = 'selectableDropdown' onClick = {this.onClick}> + </tspan>
      </text>
    </g>
  }

  dropDownClick(e) {
    e.preventDefault()
    console.log('Clicked', this) 
  }

  amountMenuOptions() {
    const { selectedEnergy } = this.props
    return <g><MenuBarOption 
      key='electricityAmountPriceMenu'
      yaxis = { WorkspaceComputations.electricityAmountPriceMenuY() }
      options={Constants.getIn(['energyMeasurementTypes', selectedEnergy])}
      onOptionClick = {this.props.setElectricityDataType.bind(this)}
      selectedOption = {this.props.electricityDataType}
      optionXaxisPadding = {Constants.getIn(['menuBarOptions', 'optionXaxisPadding'])}
      optionPadding = {Constants.getIn(['menuBarOptions', 'optionPadding'])}
      trKey = 'electricityDataTypes' 
      language = {this.props.language}
    /></g>
  }

  render() {
    if(this.props.importExportVisualization !== 'naturalGasLiquids') {
      return null
    } else 
    return <g>
      {this.subproductText()}
      {this.controlArrowImage()}
    </g>
    
  }
}

const mapStateToProps = state => {
  return {
    viewport: state.viewport,
    importExportVisualization: state.importExportVisualization,
    language: state.language
  }
}

module.exports = ReactRedux.connect(mapStateToProps)(NglSubproductMenu)
