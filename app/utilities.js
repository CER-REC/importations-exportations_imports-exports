import TR from './TranslationTable'
import { analyticsDataSelector } from './selectors/data'

const numLocale = (v, decimals = 2) => v.toLocaleString(undefined, { maximumFractionDigits: decimals })
export const humanNumber = (valueRaw, language, maxCharacters = 4) => {
  if (numLocale(valueRaw).length <= maxCharacters) { return numLocale(valueRaw) }
  let value = valueRaw
  let valueScale = 0
  while (numLocale(value, 0).length > maxCharacters && value >= 1000) {
    value /= 1000
    valueScale += 1
  }
  return `${numLocale(value)}${TR.getIn(['formatNumberUnit', language, valueScale])}`
}

export const handleInteraction = (func, ...boundArgs) => {
  const handle = (e) => {
    if (e.type === 'click') {
      e.preventDefault()
      e.stopPropagation()
      func(...boundArgs)
    } else if (e.type === 'keypress') {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        e.stopPropagation()
        func(...boundArgs)
      }
    }
  }
  return {
    onClick: handle, onKeyPress: handle, onKeyDown: handle, tabIndex: 0, focusable: 'true',
  }
}

export const handleInteractionWithTabIndex = (tabIndex, func, ...boundArgs) => {
  const event = handleInteraction(func, ...boundArgs)
  event.tabIndex = tabIndex
  return event
}

export const parsePeriod = period => ({
  year: parseInt(period.substr(0, 4), 10),
  quarter: parseInt(period.substr(5), 10),
})

let getState
export const prepareAnalytics = (store) => { getState = () => store.getState() }

/**
 * [description]
 * @param  {[type]} analyticsObject [analyticsDataSelector from selector/data.js]
 * @param  {[type]} category        [category Constant.getIn(['analytics','category'])]
 * @param  {[type]} action          [action Constant.getIn(['analytics','action'])]
 * @param  {[type]} eventDetail     [plain text for additional detail for example in map piece we ca send name e.g. "NY"]
 * @return {[type]}                 [returns a updated object for analytics]
 */

export const analyticsReporter = (category, action, eventDetail) => {
  if (typeof window.dataLayer === 'undefined') {
    console.warn('Google Tag Manager not found.')
  }

  if (typeof window.dataLayer === 'undefined') { return null }

  const analyticsObject = analyticsDataSelector(getState(), {})

  const dataObject = {
    ...analyticsObject,
    action,
    category,
    label: eventDetail,
  }
  console.log('Sending GA report:', dataObject)
  return window.dataLayer.push(dataObject)
}
