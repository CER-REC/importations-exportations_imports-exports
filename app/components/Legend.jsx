const React = require('react')
const ReactRedux = require('react-redux')

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
          <image 
            className = 'legendImage'
            height = {Constants.getIn(['legend','iconHeight'])}
            width = {Constants.getIn(['legend','iconHWidth'])}
            x = {11.5}
            y = { 806.8 }
            xlinkHref = 'images/arrow_import.svg'
          ></image>
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
          fill = "#fff"
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



  render() {
    return <g>
      {this.importColumn()}
      {this.exportColumn()}
      {this.textValues()}
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