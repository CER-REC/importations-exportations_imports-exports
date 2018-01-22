
function ExplanationSummonedCreator (explanationDot) {
  return {
    type: 'ExplanationSummoned',
    explanationDot: explanationDot,
  }
}

module.exports = ExplanationSummonedCreator