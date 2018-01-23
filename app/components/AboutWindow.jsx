
const React = require('react')
const ReactRedux = require('react-redux')
const Constants = require('../Constants.js')

const ShowAboutWindowCreator = require('../actionCreators/ShowAboutWindowCreator.js')


require('./AboutWindow.scss')

const Tr = require('../TranslationTable.js')

class AboutWindow extends React.Component {
  constructor(props) {
    super(props)
    this.state = {showAboutWindow: false}

    this.handleShow = this.handleShow.bind(this)
    this.handleHide = this.handleHide.bind(this)
  }

  handleShow() {
    this.setState({showAboutWindow: true})
  }

  handleHide() {
    this.setState({showAboutWindow: false})
  }

  closeButton() {
    return <img
      className='closeButton'
      src='images/about_close.svg'
      onClick = {this.handleHide}>
    </img>
  }

  heading() {
    return <p
      className='aboutHeading'>
      {Tr.getIn(['aboutWindow', 'heading', this.props.language])}
    </p>
  }

  intro() {
    return <div className='aboutBodyText'>
      <p className = 'intro'>
        <span>
          {Tr.getIn(['aboutWindow', 'p1', this.props.language])}
        </span>      
      </p>
      <p>
        <span>
          {Tr.getIn(['aboutWindow', 'p2', this.props.language])}
        </span>
      </p>
      <p>
        <span>
          {Tr.getIn(['aboutWindow', 'p3', this.props.language])}
        </span>
      </p>
      <p>
        <span>
          {Tr.getIn(['aboutWindow', 'p4', this.props.language])}
        </span>
      </p>
    </div>
  }

  contributors() {
    return <div className = 'contributorsSection'>
      <p className = 'aboutHeading'>
        <span>
        { Tr.getIn(['aboutWindow', 'contributors', this.props.language])}
        </span>
      </p>
      <p className = 'aboutSubheading'>
        <span>
        { Tr.getIn(['aboutWindow', 'dataSource', this.props.language])}
        </span>
      </p>
      <p className = 'aboutBodyText'>
        <span>
        { Tr.getIn(['aboutWindow', 'dataNamesfromNEB', this.props.language])}
        </span>
      </p>
      <p className = 'aboutSubheading'>
        <span>
        { Tr.getIn(['aboutWindow', 'coordination', this.props.language])}
        </span>
      </p>
      <p className = 'aboutBodyText'>
        <span>
        { Tr.getIn(['aboutWindow', 'nebCoordinators', this.props.language])}
        </span>
      </p>
    </div>
  }

  dataVisualization() {
    return <div className = 'dataVisSection'>
      <p className = 'aboutHeading'>
        <span>
        { Tr.getIn(['aboutWindow', 'dataVisualization', this.props.language])}
        </span>
      </p>
      <p className = 'aboutSubheading'>
        <span>
        { Tr.getIn(['aboutWindow', 'leadDesignResearch', this.props.language])}
        </span>
      </p>
      <p className = 'aboutBodyText'>
        <span>
        { Tr.getIn(['aboutWindow', 'leadDesigners', this.props.language])}
        </span>
      </p>
      <p className = 'aboutSubheading'>
        <span>
        { Tr.getIn(['aboutWindow', 'coordination', this.props.language])}
        </span>
      </p>
      <p className = 'aboutBodyText'>
        <span>
        { Tr.getIn(['aboutWindow', 'coordi', this.props.language])}
        </span>
      </p>
      <p className = 'aboutSubheading'>
        <span>
        { Tr.getIn(['aboutWindow', 'design', this.props.language])}
        </span>
      </p>
      <p className = 'aboutBodyText'>
        <span>
        { Tr.getIn(['aboutWindow', 'designers', this.props.language])}
        </span>
      </p>
      <p className = 'aboutSubheading'>
        <span>
        { Tr.getIn(['aboutWindow', 'leadTechnical', this.props.language])}
        </span>
      </p>
      <p className = 'aboutBodyText'>
        <span>
        { Tr.getIn(['aboutWindow', 'vizworx', this.props.language])}
        </span>
      </p>
      <p className = 'aboutSubheading'>
        <span>
        { Tr.getIn(['aboutWindow', 'technical', this.props.language])}
        </span>
      </p>
      <p className = 'aboutBodyText'>
        <span>
        { Tr.getIn(['aboutWindow', 'technicalTeam', this.props.language])}
        </span>
      </p>
    </div>
  }

  render() {
    const modal = this.state.showAboutWindow ? (
      <div 
        id = 'aboutWindow'
        className = 'aboutWindow'>
        { this.closeButton() }
        { this.heading() }
        { this.intro() }
        { this.contributors() }
        { this.dataVisualization() }
      </div>
      ) : null
    return <div>This div has overflow: hidden.
        <button onClick={this.handleShow}>Show modal</button>
        {modal}
        </div>
  }
}

const mapStateToProps = state => {
  return {
    language: state.language,
    viewport: state.viewport,
    showAboutWindow: state.showAboutWindow,
  }
}

const mapDispatchToProps = dispatch => ({
  onClick() {
    dispatch(ShowAboutWindowCreator())
  },
})

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(AboutWindow)
