const React = require('react')
const ReactRedux = require('react-redux')
const Immutable = require('immutable')
const PropTypes = require('prop-types')

const Constants = require('../Constants.js')
const Tr = require('../TranslationTable.js')

require('./Header.scss')
require('../styles/Fonts.scss')
require('../styles/Colours.scss')

class Header extends React.Component {
  static get propTypes() {
    return {
      language: PropTypes.string.isRequired,
      viewport: PropTypes.instanceOf(Immutable.Map).isRequired,
    }
  }

  constructor(props) {
    super(props)
    this.resetClick = this.resetClick.bind(this)
  }

  resetClick() { // eslint-disable-line class-methods-use-this
    // TODO: add reset visualization functionality
  }

  leftHeading() {
    return (
      <div className="leftHeader">
        <div className="headingImports">
          {Tr.getIn(['mainHeading', 'imports', this.props.language])}
        </div>&nbsp;
        <div className="headingBase" >
          {Tr.getIn(['mainHeading', 'ampersand', this.props.language])}
        </div>&nbsp;
        <div className="headingExports">
          {Tr.getIn(['mainHeading', 'exports', this.props.language])}
        </div>&nbsp;
        <div className="headingBase">
          {Tr.getIn(['mainHeading', 'base', this.props.language])}
        </div>
        <p className="subheading">
          {Tr.getIn(['mainSubheading', this.props.language])}
        </p>
      </div>
    )
  }

  metaBar() {
    const transformMetaBarIcons = `translate(${this.props.viewport.get('x') - Constants.getIn(['metaBar', 'iconMargin'])}, 0)`

    return (
      <svg
        className="metaBar"
        width={this.props.viewport.get('x')}
        height={Constants.get('topHeightMargin')}
      >
        <rect
          width={Constants.getIn(['metaBar', 'width'])}
          height={Constants.getIn(['metaBar', 'height'])}
          x={this.props.viewport.get('x') - Constants.getIn(['metaBar', 'width'])}
          className="metaBarBackground"
        />
        <g>
          <text
            className="resetLabel"
            onClick={this.resetClick}
            y={Constants.getIn(['metaBar', 'resetTextY'])}
            x={this.props.viewport.get('x') - Constants.getIn(['metaBar', 'resetTextOffset'])}
          >{ Tr.getIn(['resetLabel', this.props.language]) }
          </text>
        </g>

        <g transform={transformMetaBarIcons} >
          <image
            className="metaBarButton"
            height={Constants.getIn(['metaBar', 'iconSize'])}
            width={Constants.getIn(['metaBar', 'iconSize'])}
            xlinkHref="images/reset.svg"
            onClick={this.resetClick}
            y={Constants.getIn(['metaBar', 'resetIconMargin'])}
          />
        </g>
      </svg>
    )
  }


  render() {
    return (<div style={{ height: Constants.get('topHeightMargin') }}>
      {this.leftHeading()}
      {this.metaBar()}
    </div>)
  }
}


const mapStateToProps = state => ({
  viewport: state.viewport,
  language: state.language,
})

module.exports = ReactRedux.connect(mapStateToProps)(Header)
