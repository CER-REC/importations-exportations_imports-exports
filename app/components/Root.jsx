
const React = require('react')

const Workspace = require('./Workspace')

require('../styles/Common.scss')

class Root extends React.Component {
  render() {
    return <div>
      <Workspace />
    </div>

  }
}

module.exports = Root