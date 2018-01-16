const React = require('react')

class SampleBasicComponent extends React.Component {
  render() {
    return (<div>
      <p>{ `Why hello there ${this.props.name}` }</p>
            </div>)
  }
}


module.exports = SampleBasicComponent
