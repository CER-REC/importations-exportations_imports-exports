
const React = require('react')
const ReactRedux = require('react-redux')

const Workspace = require('./Workspace')

require('../styles/Common.scss')

class Root extends React.Component {
  render() {
  	if(this.props.dataLoadingComplete){
		return (<div>
			<Workspace />
		</div>)  		
  	} else {
      const loaderStyle =  {
          height: this.props.viewport.get('y'),
          width: this.props.viewport.get('x'),
      }
      return (<div style={loaderStyle}>
        <div className="loader"></div>
      </div>)
  	}

  }
}

const mapStateToProps = (state, props) => ({
  viewport: state.viewport,
  dataLoadingComplete: state.dataLoadingComplete
})

module.exports = ReactRedux.connect(
  mapStateToProps,
)(Root)
