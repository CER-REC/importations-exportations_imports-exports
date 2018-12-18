function ResizeScreenCreator(x, y, changeWidthRatio, changeHeightRatio) {
  return {
    type: 'ResizeScreen',
    x,
    y,
    changeWidthRatio,
    changeHeightRatio,
  }
}

export default ResizeScreenCreator
