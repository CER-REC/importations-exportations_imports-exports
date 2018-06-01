import Constants from '../Constants'
import Tr from '../TranslationTable'

const BrowserCookies = require('browser-cookies')

/*
The following members of the app's state are routable: they are represented in
the URL bar. When the app loads, its state is initialized from the URL bar, and
as the user navigates around the URL bar is kept up to date with the current
state.

These items are represented as URL parameters:
 selected energy

Language is also represented, but is inferred from the application path.
See applicationPath in TranslationTable.js

pathnames are subject to change depending on the final name given by NEB

In each case, the meaning of an element's absence from the URL is specified, and
the element is not added to the URL bar if the current state matches the
meaning associated with absence.

*/

const RouteComputations = {

  paramsToUrlString(params) {
    const urlParts = Object.keys(params).map(key => `${key}=${params[key]}`)
    return `?${urlParts.join('&')}`
  },

  bitlyParameter(language) {
    return `${Constants.get('appHost')}${Tr.getIn(['applicationPath', language])}${encodeURIComponent(document.location.search)}`
  },

  bitlyEndpoint(language) {
    switch (process.env.NODE_ENV) {
      case 'development': {
        const root = RouteComputations.appRoot(language)
        return `${root}bitly_url`
      }
      case 'production':
      default:
        return `${document.location.origin}/bitlyService/api/bitlyShortlink`
    }
  },

  dataEndpoint: () => {
    if (process.env.NODE_ENV === 'development') {
      // FIXME: Hardcoded language because the data isn't language specific
      const root = RouteComputations.appRoot('en')
      return `${root}data/data.json`
    }
    return `${document.location.origin}/imports-exports/data/data.json`
  },

  topoEndpoint: () => {
    if (process.env.NODE_ENV === 'development') {
      // FIXME: Hardcoded language because the data isn't language specific
      const root = RouteComputations.appRoot('en')
      return `${root}data/topo.json`
    }
    return `${document.location.origin}/imports-exports/data/topo.json`
  },

  determineLanguage() {
    if (document.location.pathname.match(Tr.getIn(['applicationPath', 'en']))) {
      return 'en'
    }
    if (document.location.pathname.match(Tr.getIn(['applicationPath', 'fr']))) {
      return 'fr'
    }

    // Default to English
    return 'en'
  },

  screenshotMode() {
    return !!document.location.pathname.match(`/${Constants.get('appScreenshotPath')}$`)
  },

  applicationPath(language) {
    return Tr.getIn(['applicationPath', language])
  },

  // A string for the root of the application, a suitable place for making rest
  // requests or building other URLs. E.g.:
  // http://localhost:3003/imports-exports/
  // https://apps2.neb-one.gc.ca/importations-exportations/
  appRoot(language) {
    return `${document.location.origin}${RouteComputations.applicationPath(language)}`
  },

  screenshotParameter(language) {
    // The double-encode of the search is correct
    return encodeURIComponent(`${RouteComputations.applicationPath(language)}${Constants.get('appScreenshotPath')}${encodeURIComponent(document.location.search)}`)
  },

  screenshotURL(language) {
    let path = `${RouteComputations.screenshotOrigin()}/${Constants.get('serviceScreenshotPath')}/?v=2`
    path += `&pageUrl=${RouteComputations.screenshotParameter(language)}`
    path += `&width=${Constants.get('screenshotWidth')}&height=${Constants.get('screenshotHeight')}`
    path += `&host=${document.location.host}`
    return path
  },

  screenshotOrigin() {
    switch (process.env.NODE_ENV) {
      case 'development':
        return 'http://localhost:3002'
      case 'production':
      default:
        return document.location.origin
    }
  },
}

export default RouteComputations
