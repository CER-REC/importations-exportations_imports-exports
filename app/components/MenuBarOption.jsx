const React = require('react')
const Constants = require('../Constants.js')
const TriangularTabLine = require('./TriangularTabLine.jsx')
const Tr = require('../TranslationTable.js')

require('./MenuBarOption.scss')

class MenuBarOption extends React.Component {
  render() {
    const options = this.props.options
    return options.map((key, index) => {
      const yaxis = this.props.yaxis + index * this.props.optionPadding
      if (key === this.props.selectedOption) {
        return (<g key={key}>
          <text x={this.props.optionXaxisPadding} y={yaxis} className="SelectedMenuBarOption MenuBarOptionFont">
            {Tr.getIn([this.props.trKey, key, this.props.language])}
          </text>
          <TriangularTabLine yaxis={yaxis} color={this.props.color} lineWidth={this.props.lineWidth} />
                </g>)
      }
      return (<g key={key} onClick={this.props.onOptionClick.bind(this, key)}>
        <text x={this.props.optionXaxisPadding} y={yaxis} className="MenuBarOptionFont">
          {Tr.getIn([this.props.trKey, key, this.props.language])}
        </text>
              </g>)
    })
  }
}

module.exports = MenuBarOption
