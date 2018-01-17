const React = require('react')
const ReactRedux = require('react-redux')

class SampleReduxComponent extends React.Component {
  render() {
    return (<div>
      <p>{ `Why hello there ${this.props.name}` }</p>
            </div>)
  }
}


const mapStateToProps = state => ({
  name: state.name,
})

module.exports = ReactRedux.connect(mapStateToProps)(SampleReduxComponent)
module.exports.unwrapped = SampleReduxComponent
