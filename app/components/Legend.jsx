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
    return <svg
      className='importColumn'
    >
      <g>
        <rect
          y = {800}
          x={11.5}
          width = {50}
          height = { Constants.getIn(['legend','height']) }
          fill = "#fff"
        />

        <g>
          <text className='theLegendHeading'
            x = {15.045} 
            y={800} 
          > {Tr.getIn(['theLegendValues','importations', this.props.language])}
          </text>
        </g>

        <g>
          <g>
            <LegendArrow 
              xPosition = {11.5}
              yPosition = { 806.8 }
              colour = 'red'/>
          </g>

          <image 
            className = 'legendImage'
            height = {Constants.getIn(['legend','iconHeight'])}
            width = {Constants.getIn(['legend','iconHWidth'])}
            x = {11.5}
            y = { 824.69 }
            xlinkHref = 'images/arrow_import.svg'
          ></image>
          <image 
            className = 'legendImage'
            height = {Constants.getIn(['legend','iconHeight'])}
            width = {Constants.getIn(['legend','iconHWidth'])}
            x = {11.5}
            y = { 842.58 }
            xlinkHref = 'images/arrow_import.svg'
          ></image>
          <image 
            className = 'legendImage'
            height = {Constants.getIn(['legend','iconHeight'])}
            width = {Constants.getIn(['legend','iconHWidth'])}
            x = {11.5}
            y = { 860.47 }
            xlinkHref = 'images/arrow_import.svg'
          ></image>
          <image 
            className = 'legendImage'
            height = {Constants.getIn(['legend','iconHeight'])}
            width = {Constants.getIn(['legend','iconHWidth'])}
            x = {11.5}
            y = { 878.36 }
            xlinkHref = 'images/arrow_import.svg'
          ></image>
        </g>
      </g>
    </svg>
  }

  exportColumn() {
    return <svg
      className='exportColumn'
    >
      <g>
        <rect
          y = {800}
          x={40}
          width = {40}
          height = { Constants.getIn(['legend','height']) }
          fill = "#fff"
        />

        <g>
          <text className='theLegendHeading'
            x = {52.5} 
            y={800} 
          > {Tr.getIn(['theLegendValues','exportations', this.props.language])}
          </text>
        </g>

        <g>
          <svg className = 'legendImage'  x = {47.99}
            y = { 806.8 }>
            <polygon fill='green'
              points="30.46 4.09 15.17 11.38 0 4.07 0 3.41 2.75 3.41 2.76 0.01 28.03 0 28.05 3.41 30.47 3.42 30.46 4.09"/>
          </svg>



          <image 
            className = 'legendImage'
            height = {Constants.getIn(['legend','iconHeight'])}
            width = {Constants.getIn(['legend','iconHWidth'])}
            x = {47.99}
            y = { 806.8 }
            xlinkHref = 'images/arrow_export.svg'
          ></image>
          <image 
            className = 'legendImage'
            height = {Constants.getIn(['legend','iconHeight'])}
            width = {Constants.getIn(['legend','iconHWidth'])}
            x = {47.99}
            y = { 824.69 }
            xlinkHref = 'images/arrow_export.svg'
          ></image>
          <image 
            className = 'legendImage'
            height = {Constants.getIn(['legend','iconHeight'])}
            width = {Constants.getIn(['legend','iconHWidth'])}
            x = {47.99}
            y = { 842.58 }
            xlinkHref = 'images/arrow_export.svg'
          ></image>
          <image 
            className = 'legendImage'
            height = {Constants.getIn(['legend','iconHeight'])}
            width = {Constants.getIn(['legend','iconHWidth'])}
            x = {47.99}
            y = { 860.47 }
            xlinkHref = 'images/arrow_export.svg'
          ></image>
          <image 
            className = 'legendImage'
            height = {Constants.getIn(['legend','iconHeight'])}
            width = {Constants.getIn(['legend','iconHWidth'])}
            x = {47.99}
            y = { 878.36 }
            xlinkHref = 'images/arrow_export.svg'
          ></image>
        </g>

      </g>
    </svg>
  }

  textValues() {
    return <svg> 
      <g>
        <rect
          y = {800}
          x={95}
          width = {80}
          height = { Constants.getIn(['legend','height']) }
          fill = 'none'
        />
        <g>
          <text className='theLegendValues'
            x = {84.48} 
            y={814.8} 
          > {Tr.getIn(['theLegendValues', 'electricity', 'rangeOne', this.props.language])}
          </text>
          <text className='theLegendValues'
            x = {84.48} 
            y={832.69} 
          > {Tr.getIn(['theLegendValues', 'electricity','rangeTwo', this.props.language])}
          </text>
          <text className='theLegendValues'
            x = {84.48} 
            y={850.58} 
          > {Tr.getIn(['theLegendValues', 'electricity','rangeThree', this.props.language])}
          </text>
          <text className='theLegendValues'
            x = {84.48} 
            y={868.47} 
          > {Tr.getIn(['theLegendValues', 'electricity','rangeFour', this.props.language])}
          </text>
          <text className='theLegendValues'
            x = {84.48} 
            y={886.36} 
          > {Tr.getIn(['theLegendValues', 'electricity','rangeFive', this.props.language])}
          </text>
        </g>
      </g>
    </svg>
  }
  // if text values change then conditions in text values 
  // let range one = blah if....
  // change transform of crude oil group 


  changeDisplayedLegend() {
    const visualizationContainerType = this.props.importExportVisualization
    switch(visualizationContainerType){
    case 'crudeOil':
      return <g>
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
      {this.changeDisplayedLegend()}
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