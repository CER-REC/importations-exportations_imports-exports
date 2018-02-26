import React from 'react'
import { connect } from 'react-redux'
import ElectricityMapLayout from './ElectricityMapLayout.jsx'
import Immutable from 'immutable'

class USMapContainer extends React.Component {
  render() {
    return (
      <g transform={`scale(${this.props.viewport.get('changeWidthRatio')} ${this.props.viewport.get('changeHeightRatio')}) translate(${this.props.left} ${this.props.top})`}> <ElectricityMapLayout
        left={this.props.left}
        top={this.props.top}
        country="us"
      />
      </g>)
  }
}

const mapStateToProps = state => ({
  viewport: state.viewport,

})


export default connect(mapStateToProps)(USMapContainer)
