import { createSelector } from './selectHelper'

export const calculateValueSum = (data, groupBy, valueKey) => {
  const result = data.reduce((acc, next) => {
    const rowGroup = next.get(groupBy)
    const rowKey = next.get(valueKey)

    if (!acc.values[rowGroup]) { acc.values[rowGroup] = {} }
    if (!acc.values[rowGroup][rowKey]) { acc.values[rowGroup][rowKey] = 0 }
    if (!acc.totalPoints[rowGroup]) { acc.totalPoints[rowGroup] = {} }
    if (!acc.totalPoints[rowGroup][rowKey]) { acc.totalPoints[rowGroup][rowKey] = 0 }
    if (!acc.confidential[rowGroup]) { acc.confidential[rowGroup] = {} }
    if (!acc.confidential[rowGroup][rowKey]) { acc.confidential[rowGroup][rowKey] = 0 }
    if (!acc.missing[rowGroup]) { acc.missing[rowGroup] = {} }
    if (!acc.missing[rowGroup][rowKey]) { acc.missing[rowGroup][rowKey] = 0 }

    acc.values[rowGroup][rowKey] += next.get('value', 0)
    acc.totalPoints[rowGroup][rowKey] += 1
    if (next.get('confidential', false)) {
      acc.confidential[rowGroup][rowKey] += 1
    }
    if (next.get('destination') === '(blank)') {
      acc.missing[rowGroup][rowKey] += 1
    }

    return acc
  }, { values: {}, totalPoints: {}, confidential: {}, missing: {} })
  return result
}

export const calculateValueAverage = (data, groupBy, valueKey) => {
  const result = calculateValueSum(data, groupBy, valueKey)

  Object.keys(result.values).forEach((groupKey) => {
    Object.keys(result.values[groupKey]).forEach((vk) => {
      result.values[groupKey][vk] /= result.totalPoints[groupKey][vk]
    })
  })

  return result
}

export const calculateValueWeighted = (data, groupBy, valueKey) => {
  const result = data.reduce((acc, next) => {
    const rowGroup = next.get(groupBy)
    const rowKey = next.get(valueKey)

    if (!acc.values[rowGroup]) { acc.values[rowGroup] = {} }
    if (!acc.values[rowGroup][rowKey]) { acc.values[rowGroup][rowKey] = { value: 0, amount: 0 } }
    if (!acc.totalPoints[rowGroup]) { acc.totalPoints[rowGroup] = {} }
    if (!acc.totalPoints[rowGroup][rowKey]) { acc.totalPoints[rowGroup][rowKey] = 0 }
    if (!acc.confidential[rowGroup]) { acc.confidential[rowGroup] = {} }
    if (!acc.confidential[rowGroup][rowKey]) { acc.confidential[rowGroup][rowKey] = 0 }
    if (!acc.missing[rowGroup]) { acc.missing[rowGroup] = {} }
    if (!acc.missing[rowGroup][rowKey]) { acc.missing[rowGroup][rowKey] = 0 }

    if (next.get('forAverageDivisor', 0) !== 0) {
      acc.values[rowGroup][rowKey].value += next.get('forAverageValue', 0)
      acc.values[rowGroup][rowKey].amount += next.get('forAverageDivisor', 0)
    }

    acc.totalPoints[rowGroup][rowKey] += 1
    if (next.get('confidential', false)) {
      acc.confidential[rowGroup][rowKey] += 1
    }
    if (next.get('destination') === '(blank)' || next.get('forAverageDivisor', 0) === 0) {
      acc.missing[rowGroup][rowKey] += 1
    }

    return acc
  }, { values: {}, totalPoints: {}, confidential: {}, missing: {} })

  Object.keys(result.values).forEach((groupKey) => {
    Object.keys(result.values[groupKey]).forEach((vk) => {
      const { amount, value } = result.values[groupKey][vk]
      result.values[groupKey][vk] = (amount !== 0)
        ? value / amount
        : 0
    })
  })

  return result
}
