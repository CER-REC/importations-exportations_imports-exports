import React from 'react'
import PropTypes from 'prop-types'
import DomReady from 'domready'
import Modernizr from 'modernizr'

DomReady(() => {
  Modernizr.addTest('svg-transforms', () => {
    const vendorPrefixesCss = ['-moz-', '-ms-', '-webkit-', '']

    // reduce vendor prefix array to create a cssText string.
    const styleRules = vendorPrefixesCss.reduce((prev, curr) => `${prev} ${curr}transform: translateX(10px);`, '')

    const body = document.querySelector('body')
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')

    // Append elements to dom
    svg.appendChild(path)
    svg.style.cssText = 'width: 100px; visibility: transparent;'
    body.appendChild(svg)

    // getBoundingClientRect to determine if transform applied successfully.
    const initialBoundingRect = path.getBoundingClientRect()
    path.style.cssText = styleRules
    const newBoundingRect = path.getBoundingClientRect()

    body.removeChild(svg)

    return (initialBoundingRect.left !== newBoundingRect.left)
  })
})

export const makeSafeAnimation = (WrappedComponent) => {
  const SafeAnimation = (props) => {
    const {
      fallbackAttributes,
      fallbackSMIL,
      cssAnimation,
      children,
      ...spreadProps
    } = props
    let animation = fallbackAttributes || {}
    let smilChild = null
    if (Modernizr['svg-transforms']) {
      animation = { style: { ...(spreadProps.style || {}), ...cssAnimation } }
    } else if (Modernizr.smil) {
      animation = {}
      smilChild = fallbackSMIL
    }
    return (
      <WrappedComponent {...spreadProps} {...animation}>
        {children}
        {smilChild}
      </WrappedComponent>
    )
  }

  SafeAnimation.propTypes = {
    children: PropTypes.node,
    cssAnimation: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    fallbackAttributes: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    fallbackSMIL: PropTypes.node,
  }

  SafeAnimation.defaultProps = {
    children: null,
    fallbackAttributes: null,
    fallbackSMIL: null,
  }

  return SafeAnimation
}

const Group = ({ children, ...props }) => <g {...props}>{children}</g>
Group.propTypes = {
  children: PropTypes.node.isRequired,
}

export default makeSafeAnimation(Group)
