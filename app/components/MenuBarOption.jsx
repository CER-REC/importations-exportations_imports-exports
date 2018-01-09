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
          <text x = {this.props.optionXaxisPadding - 9} y = {yaxis} className='bodyText'>of</text>

          <text x = {this.props.optionXaxisPadding + 7} y = {yaxis} className='selectableDropdown'>
            {Tr.getIn([this.props.trKey, key, this.props.language]).toUpperCase() } 
          </text>

          <line x1="27" y1={yaxis + 5} x2="165" y2={yaxis + 5} strokeWidth="2" stroke="#fbb03b" />
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