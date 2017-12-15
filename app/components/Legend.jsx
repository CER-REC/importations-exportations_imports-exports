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
          y = {850}
          x={5}
          width = {50}
          height = { Constants.getIn(['legend','height']) }
          fill = "#fff"
        />

        <g>
          <text className='theLegendHeading'
            x = {15} 
            y={870} 
          > IMP
          </text>
        </g>

        <g>
          <image 
            className = 'legendImage'
            height = {Constants.getIn(['legend','iconHeight'])}
            width = {Constants.getIn(['legend','iconHWidth'])}
            x = {12}
            y = { 880 }
            xlinkHref = 'images/close-2.svg'
          ></image>
          <image 
            className = 'legendImage'
            height = {Constants.getIn(['legend','iconHeight'])}
            width = {Constants.getIn(['legend','iconHWidth'])}
            x = {12}
            y = { 915 }
            xlinkHref = 'images/close-2.svg'
          ></image>
          <image 
            className = 'legendImage'
            height = {Constants.getIn(['legend','iconHeight'])}
            width = {Constants.getIn(['legend','iconHWidth'])}
            x = {12}
            y = { 950 }
            xlinkHref = 'images/close-2.svg'
          ></image>
          <image 
            className = 'legendImage'
            height = {Constants.getIn(['legend','iconHeight'])}
            width = {Constants.getIn(['legend','iconHWidth'])}
            x = {12}
            y = { 985 }
            xlinkHref = 'images/close-2.svg'
          ></image>
          <image 
            className = 'legendImage'
            height = {Constants.getIn(['legend','iconHeight'])}
            width = {Constants.getIn(['legend','iconHWidth'])}
            x = {12}
            y = { 1020 }
            xlinkHref = 'images/close-2.svg'
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
          y = {850}
          x={55}
          width = {50}
          height = { Constants.getIn(['legend','height']) }
          fill = "#fff"
        />

        <g>
          <text className='theLegendHeading'
            x = {55} 
            y={870} 
          > EXP
          </text>
        </g>

        <g>
          <image 
            className = 'legendImage'
            height = {22}
            width = {35}
            x = {52}
            y = { 880 }
            xlinkHref = 'images/close-2.svg'
          ></image>
          <image 
            className = 'legendImage'
            height = {22}
            width = {35}
            x = {52}
            y = { 915 }
            xlinkHref = 'images/close-2.svg'
          ></image>
          <image 
            className = 'legendImage'
            height = {22}
            width = {35}
            x = {52}
            y = { 950 }
            xlinkHref = 'images/close-2.svg'
          ></image>
          <image 
            className = 'legendImage'
            height = {22}
            width = {35}
            x = {52}
            y = { 985 }
            xlinkHref = 'images/close-2.svg'
          ></image>
          <image 
            className = 'legendImage'
            height = {22}
            width = {35}
            x = {52}
            y = { 1020 }
            xlinkHref = 'images/close-2.svg'
          ></image>
        </g>

      </g>
    </svg>
  }

  textValues() {
    return <svg> 
      <g>

        <rect
          y = {850}
          x={95}
          width = {170}
          height = { Constants.getIn(['legend','height']) }
          fill = "#fff"
        />

        <g>
          <text className='theLegendValues'
            x = {88} 
            y={897} 
          > {Tr.getIn(['theLegendValues','rangeOne', this.props.language])}
          </text>
          <text className='theLegendValues'
            x = {88} 
            y={932} 
          > {Tr.getIn(['theLegendValues','rangeTwo', this.props.language])}
          </text>
          <text className='theLegendValues'
            x = {88} 
            y={967} 
          > {Tr.getIn(['theLegendValues','rangeThree', this.props.language])}
          </text>
          <text className='theLegendValues'
            x = {88} 
            y={1002} 
          > {Tr.getIn(['theLegendValues','rangeFour', this.props.language])}
          </text>
          <text className='theLegendValues'
            x = {88} 
            y={1037} 
          > {Tr.getIn(['theLegendValues','rangeFive', this.props.language])}
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
    language: state.language
  }
}


module.exports = ReactRedux.connect(mapStateToProps)(Legend)