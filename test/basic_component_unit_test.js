const Chai = require('chai')
const Expect = Chai.expect
const React = require('react')
const Enzyme = require('enzyme')
const Adapter = require('enzyme-adapter-react-16')

Enzyme.configure({adapter: new Adapter()})

const SampleBasicComponent = require('../app/components/SampleBasicComponent.jsx')



describe('SampleBasicComponent', function() {

  const wrapper = Enzyme.shallow(<SampleBasicComponent name = "Alaa"/>)

  it('renders without exploding', function() {
    Expect(wrapper).to.have.length(1)
  })

  it('has a <p> tag', function() {
    Expect(wrapper.find('p')).to.have.length(1)
  })

  it('uses the passed in "name" prop', function() {
    Expect(wrapper.find('p').text()).to.equal('Why hello there Alaa')
  })


})

