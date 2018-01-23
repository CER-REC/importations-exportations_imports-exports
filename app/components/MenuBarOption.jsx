const React = require('react')
const ReactRedux = require('react-redux')

const Constants = require('../Constants.js')
const Tr = require('../TranslationTable.js')

require('./MenuBarOption.scss')

class MenuBarOption extends React.Component {

  mainVisGreyWidth() {
    if(this.props.importExportVisualization === 'electricity') {
      return '110'
    } else if(this.props.importExportVisualization === 'crudeOil') {
      return '100'
    } else if(this.props.importExportVisualization === 'naturalGas') {
      return '120'
    } else if(this.props.importExportVisualization === 'naturalGasLiquids') {
      return '160'
    } else if(this.props.importExportVisualization === 'refinedPetroleumProducts') {
      return '170'
    }
  }

  render() {
    const options = this.props.options

    return options.map((key, index) => {
      const yaxis = this.props.yaxis + index * this.props.optionPadding

      if(key === this.props.selectedOption){
        return <g key = {key}>
          <rect 
            x = {0} 
            y = { yaxis - 15}
            width={this.mainVisGreyWidth()} 
            height="20" 
            fill = '#999999'
          />
          <text x = {this.props.optionXaxisPadding - 7} 
            y = {yaxis} >
            <tspan fill = '#666' 
              className='visSelectOfText'> of </tspan>
            <tspan className='visSelect'>{Tr.getIn([this.props.trKey, key, this.props.language]).toUpperCase()}</tspan> 
          </text>
          
        </g>
      }
      
      return <g key = {key} onClick = { this.props.onOptionClick.bind(this, key)}> 

        <text x = {this.props.optionXaxisPadding + 7} y = {yaxis} className = 'bodyText'> 
          {Tr.getIn([this.props.trKey, key, this.props.language]).toUpperCase() } 
        </text> 
      </g>
    })
  }
}

const mapStateToProps = state => {
  return {
    viewport: state.viewport,
    importExportVisualization: state.importExportVisualization,
    language: state.language,
    expandImportExportMenu: state.expandImportExportMenu
  }
}

module.exports = ReactRedux.connect(mapStateToProps)(MenuBarOption)
