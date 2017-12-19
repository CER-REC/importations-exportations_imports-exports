const Immutable = require('immutable')
const QueryString = require('query-string')
const BrowserCookies = require('browser-cookies')

const Constants = require('./Constants.js')
const Tr = require('./TranslationTable.js')

/*
The following members of the app's state are routable: they are represented in
the URL bar. When the app loads, its state is initialized from the URL bar, and
as the user navigates around the URL bar is kept up to date with the current
state.

These items are represented as URL parameters:
  columns
  categories
  showEmptyCategories
  pinnedIncidents

Language is also represented, but is inferred from the application path. 
  en: /pipeline-incidents
  fr: /incidents-pipeliniers
See applicationPath in TranslationTable.js

In each case, the meaning of an element's absence from the URL is specified, and
the element is not added to the URL bar if the current state matches the
meaning associated with absence.

*/

const RouteComputations = {






















}




module.exports = RouteComputations