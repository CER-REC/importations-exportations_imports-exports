import React from 'react'
import modernizrSVGTransformsTest from 'modernizr-svg-transforms'
import DomReady from 'domready'

DomReady(modernizrSVGTransformsTest)

export default class SafeAnimation extends React.PureComponent {
  render() {
    if (Modernizr['svg-transforms'] !== true) {
      return (
        <g {...this.props.fallbackAttributes}>
          {this.props.children}
        </g>
      )
    }
    return (
      <g style={this.props.cssAnimation}>
        {this.props.children}
      </g>
    )
    return null
  }
}
