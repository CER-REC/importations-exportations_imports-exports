/* eslint-disable no-underscore-dangle */

// Purpose of this class is to store all debugging message so that we can avoid
// printing something on console

/*
Function updates windows object
 */
const updateWindowsBadDataObject = (error) => {
  // check for the prod environment
  if (process.env.NODE_ENV !== 'production') {
    let baddata = window._badData
    if (typeof baddata === 'undefined') {
      baddata = {}
    }
    if (typeof baddata[error.message] === 'undefined' || baddata[error.message].size === 0) {
      baddata[error.message] = []
    }
    baddata[error.message].push(error)
    window._badData = baddata
  }
}

/*
  This funciton stores errors in a global object i.e. windows._baddata.
  This variable can be accessed using console, type windows._baddata
  This is done so that we don't print any thing on console which slows the performance
  It will create global object in the production enviroment
 */

const ErrorMessageTable = (functionName, message, error) => {
  const errorObject = {
    function: functionName,
    message,
    error,
  }
  updateWindowsBadDataObject(errorObject)
}

module.exports = {
  ErrorMessageTable,
}
