import Tr from '../TranslationTable'

export const Types = {}

const { pathname } = document.location
const frenchPath = Tr.getIn(['applicationPath', 'fr'])
const initialState = (pathname.startsWith(frenchPath)) ? 'fr' : 'en'
// There are no action creators, so this just returns the state it is provided
export const reducer = (state = initialState) => state
