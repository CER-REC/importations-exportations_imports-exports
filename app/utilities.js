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
