/* global Modernizr */
import React from 'react'
import PropTypes from 'prop-types'
import modernizrSVGTransformsTest from 'modernizr-svg-transforms'
import DomReady from 'domready'

DomReady(modernizrSVGTransformsTest)

export const makeSafeAnimation = (WrappedComponent) => {
  const SafeAnimation = (props) => {
    const {
      fallbackAttributes,
      cssAnimation,
      children,
      ...spreadProps
    } = props
    const animation = Modernizr['svg-transforms']
      ? { style: { ...(spreadProps.style || {}), ...cssAnimation } }
      : (fallbackAttributes || cssAnimation) // Fallback is cssAnimations if not defined
    return <WrappedComponent {...spreadProps} {...animation}>{children}</WrappedComponent>
  }

  SafeAnimation.propTypes = {
    children: PropTypes.node,
    cssAnimation: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    fallbackAttributes: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  }

  SafeAnimation.defaultProps = {
    children: null,
    fallbackAttributes: null,
  }

  return SafeAnimation
}

const Group = ({ children, ...props }) => <g {...props}>{children}</g>
Group.propTypes = {
  children: PropTypes.node.isRequired,
}

export default makeSafeAnimation(Group)
