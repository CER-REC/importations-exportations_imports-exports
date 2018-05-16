const Chai = require('chai')
const Expect = Chai.expect
const React = require('react')
const Enzyme = require('enzyme')
const Adapter = require('enzyme-adapter-react-16')
const Redux = require('redux')
const ReactRedux = require('react-redux')


Enzyme.configure({adapter: new Adapter()})

const SampleReduxComponent = require('../app/components/SampleReduxComponent.jsx')
const UnwrappedSampleReduxComponent = SampleReduxComponent.unwrapped



describe('SampleReduxComponent', function() {

  describe('With Redux', function () {

    const reducers = Redux.combineReducers({
      name: () => 'Charlie'
    })

    const store = Redux.createStore(reducers)

    const reduxComponent = Enzyme.render(<ReactRedux.Provider store={store}>
      <SampleReduxComponent />
    </ReactRedux.Provider>)

    it('renders without exploding', function() {
      Expect(reduxComponent).to.have.length(1)
    })

    it('has a <p> tag', function() {
      Expect(reduxComponent.find('p')).to.have.length(1)
    })

    it('uses the passed in "name" prop', function() {
      Expect(reduxComponent.find('p').text()).to.equal('Why hello there Charlie')
    })
  })

  describe('Without Redux', function () {

    const unwrappedComponent = Enzyme.shallow(<UnwrappedSampleReduxComponent name = "Rahul"/>)

    it('renders without exploding', function() {
      Expect(unwrappedComponent).to.have.length(1)
    })

    it('has a <p> tag', function() {
      Expect(unwrappedComponent.find('p')).to.have.length(1)
    })

    it('uses the passed in "name" prop', function() {
      Expect(unwrappedComponent.find('p').text()).to.equal('Why hello there Rahul')
    })
  })



})

