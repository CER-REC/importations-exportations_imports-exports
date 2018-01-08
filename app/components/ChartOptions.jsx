const React = require('react')
const { connect } = require('react-redux')

const Constants = require('../Constants')
const { bargraphScaleLinked } = require('../actions/ui')

class ChartOptions extends React.PureComponent {
  constructor(props) {
    super(props)
    this.scaleLinkedChanged = this.scaleLinkedChanged.bind(this)
  }

  scaleLinkedChanged(e) {
    // FIXME: Controlled checkbox doesn't seem to be working properly. If I
    // prevent the default action for the event, the checkbox takes two clicks
    this.props.bargraphScaleLinked(e.target.checked)
  }

  renderScaleToggle() {
    if (this.props.changeScale === false) { return null }

    const image = this.props.scaleLinked
      ? 'images/link.svg'
      : 'images/link_broken.svg'

    return (
      <label htmlFor="scaleLinked">
        <div className="switch">
          <input
            type="checkbox"
            id="scaleLinked"
            checked={this.props.scaleLinked}
            onChange={this.scaleLinkedChanged}
          />
          <div className="slider round" />
        </div>
        <img src={image} height="20"/>
      </label>
    )
  }

  render() {
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: Constants.getIn(['styleGuide', 'colours', 'SandLight']),
          lineHeight: `${this.props.height}px`,
        }}
      >
        {this.renderScaleToggle()}
        <div style={{ float: 'right' }}>
          by YEAR +
        </div>
      </div>
    )
  }
}

module.exports = connect(
  state => ({
    scaleLinked: state.ui.get('barGraphScaleLinked'),
  }),
  { bargraphScaleLinked }
)(ChartOptions)
