const React = require('react')
const Constants = require('../Constants.js')
const Tr = require('../TranslationTable.js')

require('./MenuBarOption.scss')

class MenuBarOption extends React.Component {
  render() {
    const options = this.props.options

    return options.map((key, index) => {
      const yaxis = this.props.yaxis + index * this.props.optionPadding

      if(key === this.props.selectedOption){
        return <g key = {key}>
          <rect 
            x = {0} 
            y = { yaxis - 15}
            width="170" 
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

module.exports = MenuBarOption