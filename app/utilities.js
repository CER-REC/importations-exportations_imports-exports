import TR from './TranslationTable'

export const humanNumber = (valueRaw, language) => {
  if (valueRaw < 1000000) { return valueRaw }
  let value = valueRaw
  let valueScale = 0
  while (value >= 1000) {
    value /= 1000
    valueScale += 1
  }
  return `${value.toLocaleString()}${TR.getIn(['formatNumberUnit', language, valueScale])}`
}

export const handleInteraction = (func, ...boundArgs) => {
  const handle = (e) => {
    if (e.type === 'click') {
      e.preventDefault()
      func(...boundArgs)
    } else if (e.type === 'keypress') {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        func(...boundArgs)
      }
    }
  }
  return { onClick: handle, onKeyPress: handle, tabIndex: 0 }
}
