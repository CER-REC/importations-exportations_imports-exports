const actionLog = () => next => (action) => {
  if (process.env.NODE_ENV === 'development') {
    console.info('Redux Action:', action)
  }
  next(action)
}

export default actionLog
