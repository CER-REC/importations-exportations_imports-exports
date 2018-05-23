
function ExplanationSummonedCreator(explanationDot) {
  return {
    type: 'ExplanationSummoned',
    explanationDot,
  }
}

module.exports = ExplanationSummonedCreator
