const React = require('react')
const ReactRedux = require('react-redux')

const Constants = require('../Constants.js')
const Tr = require('../TranslationTable.js')

require('./Header.scss')
require('../styles/Fonts.scss')
require('../styles/Colours.scss')

class Header extends React.Component {

  aboutThisProjectClick() {
    // TODO: summon 'About This Project' window
    return 
  }

  methodologyClick() {
    // TODO: add methodology click functionality
    return
  }

  resetClick() {
    // TODO: add reset visualization functionality
    return
  }

  leftHeading() {
    return <div className = 'leftHeader'>
      <div
        className = 'headingImports'
      >{ Tr.getIn(['mainHeading', 'imports', this.props.language]) } </div>&nbsp;
      <div
        className = 'headingBase'
      > { Tr.getIn(['mainHeading', 'ampersand', this.props.language]) } </div>&nbsp;
      <div
        className = 'headingExports'
      > { Tr.getIn(['mainHeading', 'exports', this.props.language]) } </div>&nbsp;
      <div
        className = 'headingBase'
      > { Tr.getIn(['mainHeading', 'base', this.props.language]) }</div>
      <p
        className = 'subheading'>
        { Tr.getIn(['mainSubheading', this.props.language]) }
      </p>
    </div>
  }

  metaBar() {

    let transformMetaBarIcons = `translate(${this.props.viewport.get('x') - Constants.getIn(['metaBar', 'iconMargin'])}, 0)`

    return <svg
      className = 'metaBar'
      width = {this.props.viewport.get('x')}
      height = { Constants.get('topHeightMargin')}
    >

      <rect
        width = { Constants.getIn(['metaBar','width']) }
        height = { Constants.getIn(['metaBar','height']) }
        x = { this.props.viewport.get('x') - Constants.getIn(['metaBar','width'])}
        className = 'metaBarBackground'
      />

      <g>
        <text
          className = 'resetLabel'
          onClick = {this.resetClick.bind(this) }
          y = { Constants.getIn(['metaBar','resetTextY']) }
          x = { this.props.viewport.get('x') - Constants.getIn(['metaBar', 'resetTextOffset'])}
        >{ Tr.getIn(['resetLabel', this.props.language]) }</text>
      </g>

      <g transform = { transformMetaBarIcons } >
        <image
          className = 'metaBarButton'
          height = {Constants.getIn(['metaBar', 'iconSize']) }
          width = { Constants.getIn(['metaBar', 'iconSize']) }
          xlinkHref = 'images/info_about.svg'
          y = { Constants.getIn(['metaBar', 'aboutThisProjectIconMargin']) }
          onClick = { this.aboutThisProjectClick.bind(this) }
        />

        <image 
          className = 'metaBarButton'
          height = {Constants.getIn(['metaBar', 'iconSize']) }
          width = {Constants.getIn(['metaBar', 'iconSize']) }
          xlinkHref = 'images/info_methodology.svg'
          y = { Constants.getIn(['metaBar', 'methodologyIconMargin']) }
          onClick = { this.methodologyClick.bind(this) }
        />

        <image 
          className = 'metaBarButton'
          height = {Constants.getIn(['metaBar', 'iconSize']) }
          width = {Constants.getIn(['metaBar', 'iconSize']) }
          xlinkHref = 'images/reset.svg'
          onClick = {this.resetClick.bind(this) }
          y = { Constants.getIn(['metaBar', 'resetIconMargin']) }
        />
      </g>

    </svg>
  }


  render() {
    return <div style={{ height: Constants.get('topHeightMargin') }}>
      {this.leftHeading()}
      {this.metaBar()}
    </div>
  }

}


const mapStateToProps = state => {
  return {
    viewport: state.viewport,
    language: state.language
  }
}

module.exports = ReactRedux.connect(mapStateToProps)(Header)
