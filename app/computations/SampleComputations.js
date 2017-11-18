// TODO: Delete this file

const Immutable = require('immutable')
const MemoizeImmutable = require('memoize-immutable')

const SampleComputations = {
  concat: function (listA, listB) {
    return listA.concat(listB)
  }
}


const MemoizedComputations = {}

for (const name of Object.keys(SampleComputations)) {
  MemoizedComputations[name] = MemoizeImmutable(SampleComputations[name])
}

module.exports = MemoizedComputations



