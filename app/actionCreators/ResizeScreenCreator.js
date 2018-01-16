function ResizeScreenCreator(x, y) {
  return {
    type: 'ResizeScreen',
    x,
    y,
  }
}

module.exports = ResizeScreenCreator
