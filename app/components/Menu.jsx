import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Constants from '../Constants'
import { handleInteraction } from '../utilities'
import { setActiveMenu } from '../actions/activeMenu'
import TrSelector from '../selectors/translate'

import './Menu.scss'

class Menu extends React.PureComponent {
  static propTypes = {
    title: PropTypes.oneOfType([
      PropTypes.shape({
        render: PropTypes.node.isRequired,
        aria: PropTypes.string.isRequired,
      }),
      PropTypes.bool,
    ]),
    expanded: PropTypes.bool,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    selected: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    top: PropTypes.number.isRequired,
    left: PropTypes.number,
    name: PropTypes.string.isRequired,
    setActiveMenu: PropTypes.func.isRequired,
    Tr: PropTypes.func.isRequired,
  }

  static defaultProps = {
    title: null,
    expanded: false,
    left: 0,
    selected: '',
  }

  onChange = (option) => {
    this.props.onChange(option)
    this.props.setActiveMenu('')
  }

  toggleMenu = () => {
    this.props.setActiveMenu(this.props.expanded ? '' : this.props.name)
  }

  renderTitle() {
    if (this.props.title === false) { return null }
    const { Tr } = this.props
    const title = {
      render: (this.props.title && this.props.title.render) || (
        <tspan>
          {Tr(['menu', this.props.name, 'prefix']) || ''}&nbsp;
          <tspan className="bold">{Tr(['menu', this.props.name, 'options', this.props.selected])}</tspan>
        </tspan>
      ),
      aria: (this.props.title && this.props.title.aria) || [
        Tr(['menu', this.props.name, 'prefix']) || '',
        Tr(['menu', this.props.name, 'options', this.props.selected]),
      ].join(' '),
    }
    const expandIcon = (this.props.options.length > 1)
      ? <tspan className="bold" aria-hidden> {this.props.expanded ? '-' : '+'}</tspan>
      : null
    return (
      <g
        role="menu"
        aria-expanded={this.props.expanded}
        aria-label={title.aria}
        {...handleInteraction(this.toggleMenu)}
      >
        <rect
          x={0}
          y={0}
          width={Constants.getIn(['menuBar', 'barWidth'])}
          height={Constants.getIn(['menuBar', 'barHeight'])}
          fill="#666"
        />
        <text
          x={Constants.getIn(['menuBar', 'textLabelOffset'])}
          y={Constants.getIn(['menuBar', 'barHeight']) / 2}
        >
          {title.render}
          {expandIcon}
        </text>
      </g>
    )
  }

  renderOptions() {
    if (!this.props.expanded) { return null }
    const { Tr } = this.props
    const options = this.props.options
      .filter(v => (v !== this.props.selected))
      .map(option => (
        <tspan
          x={0}
          dy={Constants.getIn(['menuBar', 'optionHeight'])}
          className="menuOption"
          key={option}
          {...handleInteraction(this.onChange, option)}
          role="menuitem"
        >
          <tspan className="optionText">{Tr(['menu', this.props.name, 'options', option])}</tspan>
        </tspan>
      ))

    const textOffset = Constants.getIn(['menuBar', 'textLabelOffset'])
      + Constants.getIn(['menuBar', 'expandedMenuTextMargin'])

    return (
      <g transform={`translate(${textOffset} 12)`}>
        <text>
          {options}
        </text>
      </g>
    )
  }

  render() {
    return (
      <g transform={`translate(${this.props.left} ${this.props.top})`} className="menuGroup">
        {this.renderTitle()}
        {this.renderOptions()}
      </g>
    )
  }
}

export default connect(
  (state, props) => ({
    expanded: (state.activeMenu === props.name),
    Tr: TrSelector(state, props),
  }),
  { setActiveMenu },
)(Menu)
