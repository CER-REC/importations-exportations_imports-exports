import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Constants from '../Constants'
import { handleInteraction } from '../utilities'
import { setActiveMenu } from '../actions/activeMenu'
import TrSelector from '../selectors/translate'
import Tr from '../TranslationTable'

import ExplanationDot from './ExplanationDot'

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
    showExplanations: PropTypes.bool.isRequired,
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

  amountExplanation() {
    if (this.props.name !== 'amount') { return }
    return (<g>
      <ExplanationDot
        scale="scale(1 -1) translate(0 -100)"
        lineStroke="1"
        textBoxWidth={190}
        textBoxHeight={40}
        linePath="
          M142.16,
          173.94l24.26,
          36.69a40.12,
          40.12,0,0,0,
          33.47,
          18H378.2"
        xPosition={165}
        yPosition={178}
        lineX={142.16}
        lineY={173.94}
        textX={45}
        textY={48}
        containerX={this.props.left + 2}
        containerY={this.props.top - 276}
        text={`${this.props.Tr(['explanations','amount'])}`}
        name="amountExplanation"
    /></g>)
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
    return (<g>
      <g transform={`translate(${this.props.left} ${this.props.top})`} className="menuGroup">
        {this.renderTitle()}
        {this.renderOptions()}
      </g>
        {this.amountExplanation()}
    </g>
    )
  }
}

export default connect(
  (state, props) => ({
    expanded: (state.activeMenu === props.name),
    Tr: TrSelector(state, props),
    language: state.language,
    showExplanations: state.showExplanations,
    expandCollapseExplanation: state.expandCollapseExplanation,
  }),
  { setActiveMenu },
)(Menu)
