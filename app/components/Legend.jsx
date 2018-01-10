const React = require('react')
const ReactRedux = require('react-redux')

const LegendArrow = require('./LegendArrow.jsx')
const Constants = require('../Constants.js')
const Tr = require('../TranslationTable.js')
const WorkspaceComputations = require('../computations/WorkspaceComputations.js')

require('../styles/Fonts.scss')

require('./Legend.scss')

class Legend extends React.Component {

  importColumn() {
    let transformImportColumn = `translate(${Constants.getIn(['legend','importColumn'])} 0)` 
    return <svg
      className='importColumn'
    >
      <g>
        <g>
          <text className='theLegendHeading'
            x = {Constants.getIn(['legend','importHeadingX'])} 
            y={ Constants.getIn(['legend','headingY']) } 
          > {Tr.getIn(['theLegendValues','importations', this.props.language])}
          </text>
        </g>

        <g transform = {transformImportColumn}>
          <LegendArrow 
            yPosition = { Constants.getIn(['legend','bin1Y']) }
            colour = '#fed190'
          />
          <LegendArrow 
            yPosition = { Constants.getIn(['legend','bin2Y']) }
            colour = '#fdae61'
          />
          <LegendArrow 
            yPosition = { Constants.getIn(['legend','bin3Y']) }
            colour = '#ff774c'
          />
          <LegendArrow 
            yPosition = { Constants.getIn(['legend','bin4Y']) }
            colour = '#d71c27'
          />
          <LegendArrow 
            yPosition = { Constants.getIn(['legend','bin5Y']) }
            colour = '#a50026'
          />
        </g>
      </g>
    </svg>
  }

  exportColumn() {
    let transformExportColumn = `translate(${Constants.getIn(['legend','exportColumn'])} 0)`
    let rotateArrow = 'rotate(180, 15, 5.5)'
    return <svg
      className='exportColumn'
    >
      <text className='theLegendHeading'
        x = { Constants.getIn(['legend','exportHeadingX']) } 
        y={ Constants.getIn(['legend','headingY']) } 
      > {Tr.getIn(['theLegendValues','exportations', this.props.language])}
      </text>

      <g transform = {transformExportColumn}>
        <LegendArrow 
          yPosition = { Constants.getIn(['legend','bin1Y']) }
          colour = '#d6eaf6'
          transformArrow = {rotateArrow}
        />
        <LegendArrow 
          yPosition = { Constants.getIn(['legend','bin2Y']) }
          colour = '#9ecae1'
          transformArrow = {rotateArrow}
        />
        <LegendArrow 
          yPosition = { Constants.getIn(['legend','bin3Y']) }
          colour = '#5698cb'
          transformArrow = {rotateArrow}
        />
        <LegendArrow 
          yPosition = { Constants.getIn(['legend','bin4Y']) }
          colour = '#1c64b2'
          transformArrow = {rotateArrow}
        />
        <LegendArrow 
          yPosition = { Constants.getIn(['legend','bin5Y']) }
          colour = '#084594'
          transformArrow = {rotateArrow}
        />
      </g>
    </svg>
  }

  textValues() {
    let rangeOne = `${Tr.getIn(['theLegendValues', 'electricity', 'rangeOne', this.props.language])}`
    let rangeTwo = `${Tr.getIn(['theLegendValues', 'electricity', 'rangeTwo', this.props.language])}`
    let rangeThree = `${Tr.getIn(['theLegendValues', 'electricity', 'rangeThree', this.props.language])}`
    let rangeFour = `${Tr.getIn(['theLegendValues', 'electricity', 'rangeFour', this.props.language])}`
    let rangeFive = `${Tr.getIn(['theLegendValues', 'electricity', 'rangeFive', this.props.language])}`

    let transformString = `translate(${Constants.getIn(['legend','textValuePosition'])} 0)`

    if(this.props.importExportVisualization === 'crudeOil') {
      rangeOne = `${Tr.getIn(['theLegendValues', 'crudeOil', 'rangeOne', this.props.language])}`
      rangeTwo = `${Tr.getIn(['theLegendValues', 'crudeOil', 'rangeTwo', this.props.language])}`
      rangeThree = `${Tr.getIn(['theLegendValues', 'crudeOil', 'rangeThree', this.props.language])}`
      rangeFour = `${Tr.getIn(['theLegendValues', 'crudeOil', 'rangeFour', this.props.language])}`
      rangeFive = `${Tr.getIn(['theLegendValues', 'crudeOil', 'rangeFive', this.props.language])}`
    } 
    if(this.props.importExportVisualization === 'naturalGas') {
      rangeOne = `${Tr.getIn(['theLegendValues', 'naturalGas', 'rangeOne', this.props.language])}`
      rangeTwo = `${Tr.getIn(['theLegendValues', 'naturalGas', 'rangeTwo', this.props.language])}`
      rangeThree = `${Tr.getIn(['theLegendValues', 'naturalGas', 'rangeThree', this.props.language])}`
      rangeFour = `${Tr.getIn(['theLegendValues', 'naturalGas', 'rangeFour', this.props.language])}`
      rangeFive = `${Tr.getIn(['theLegendValues', 'naturalGas', 'rangeFive', this.props.language])}`
    }
    if(this.props.importExportVisualization === 'naturalGasLiquids') {
      rangeOne = `${Tr.getIn(['theLegendValues', 'naturalGasLiquids', 'rangeOne', this.props.language])}`
      rangeTwo = `${Tr.getIn(['theLegendValues', 'naturalGasLiquids', 'rangeTwo', this.props.language])}`
      rangeThree = `${Tr.getIn(['theLegendValues', 'naturalGasLiquids', 'rangeThree', this.props.language])}`
      rangeFour = `${Tr.getIn(['theLegendValues', 'naturalGasLiquids', 'rangeFour', this.props.language])}`
      rangeFive = `${Tr.getIn(['theLegendValues', 'naturalGasLiquids', 'rangeFive', this.props.language])}`
    }

    return <svg> 
      <g transform = {transformString}>
        <text className='theLegendValues'
          y={Constants.getIn(['legend','rangeOneY'])} 
        > {rangeOne}
        </text>
        <text className='theLegendValues'
          y={Constants.getIn(['legend','rangeTwoY'])}  
        > {rangeTwo}
        </text>
        <text className='theLegendValues'
          y={Constants.getIn(['legend','rangeThreeY'])}  
        > {rangeThree}
        </text>
        <text className='theLegendValues'
          y={Constants.getIn(['legend','rangeFourY'])}  
        > {rangeFour}
        </text>
        <text className='theLegendValues' 
          y={Constants.getIn(['legend','rangeFiveY'])}  
        > {rangeFive}
        </text>
      </g>
    </svg>
  }

  shownLegend() {
    const visualizationContainerType = this.props.importExportVisualization
    let transformCrudeOil = `translate(${Constants.getIn(['legend','crudeOilLegendPosition'])} 0)`
    switch(visualizationContainerType){
    case 'crudeOil':
      return <g transform = {transformCrudeOil}>
        {this.exportColumn()}
        {this.textValues()}
      </g>
    case 'naturalGas':
      return <g>{this.importColumn()}
        {this.exportColumn()}
        {this.textValues()}
      </g>
    case 'naturalGasLiquids':
      return <g>{this.importColumn()}
        {this.exportColumn()}
        {this.textValues()}
      </g>
    case 'refinedPetroleumProducts':
      return null
    case 'electricity':
    default:
      return <g>{this.importColumn()}
        {this.exportColumn()}
        {this.textValues()}
      </g>
    }
  }

  render() {
    return <g>
      {this.shownLegend()}
    </g>
  }
}

const mapStateToProps = state => {
  return {
    viewport: state.viewport,
    language: state.language,
    importExportVisualization: state.importExportVisualization,
  }
}


module.exports = ReactRedux.connect(mapStateToProps)(Legend)