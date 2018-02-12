import React from 'react'
import { connect } from 'react-redux'
import ElectricityMapLayout from './ElectricityMapLayout.jsx'
import Immutable from 'immutable'

class USMapContainer extends React.Component {
  render() {
    const detailBreakDownData = Immutable.fromJS({
      WA: 9589756,
      VA: 465467,
      ID: 4678971,
      OR: 5548646,
    })
    return (
      <g transform={`translate(${this.props.left} ${this.props.top})`}> <ElectricityMapLayout
        left={this.props.left}
        top={this.props.top}
        country="us"
        detailBreakDownData={detailBreakDownData}
      />
      </g>)
  }
}

const mapStateToProps = state => ({
  viewport: state.viewport,

})


export default connect(mapStateToProps)(USMapContainer)
