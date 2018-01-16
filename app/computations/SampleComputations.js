// TODO: Delete this file

const MemoizeImmutable = require('memoize-immutable')

const SampleComputations = {

  // listA and listB: immutable.js lists
  concat(listA, listB) {
    return listA.concat(listB)
  },

}


const MemoizedComputations = {}

for (const name of Object.keys(SampleComputations)) {
  MemoizedComputations[name] = MemoizeImmutable(SampleComputations[name])
}

module.exports = MemoizedComputations

