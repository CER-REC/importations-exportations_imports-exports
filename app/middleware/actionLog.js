const actionLog = store => next => (action) => {
  console.info('Redux Action:', action)
  next(action)
}

export default actionLog
