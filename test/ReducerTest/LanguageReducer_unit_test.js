const Chai = require('chai')
const Expect = Chai.expect

const LanguageReducer = require('../../app/reducers/LanguageReducer.js')

describe('LanguageReducer', function() {

  it('should respond to "SetLanguage" with the value "fr" passed', function() {
    const result = LanguageReducer('fr', {type: 'SetLanguage', langauge: 'fr'})
    Expect(result).to.be.equal('fr')
  })
  it('should respond to "SetLanguage" with the value "en" passed', function() {
    const result = LanguageReducer('en', {type: 'SetLanguage', langauge: 'en'})
    Expect(result).to.be.equal('en')
  })
it('should respond to "SetLanguage" with the default state when wrong langauge type  is passed', function() {
    const result = LanguageReducer('en', {type: 'SetLanguage', langauge: 'hindi'})
    Expect(result).to.be.equal('en')
  })

it('should respond with default state i.e. "en" to "SomeRandomActionCreator"', function() {
    const result = LanguageReducer('en', {type: 'SomeRandomActionCreator', langauge: 'fr'})
    Expect(result).to.be.equal('en')
  })
})

