// Re-exporting for ease of use
import reducers from './reducers'
import { useReduxState } from './hooks'

// Imports for creating our Redux Store
import { createStore, applyMiddleware, compose } from 'redux'
import logger from 'redux-logger'

const isDev = process.env.NODE_ENV === 'development'

let middleware: any = []

// Add any middleware you want to only be in development
if (isDev) {
  middleware = [logger]
}

/**
 * In the case that we need to preload state this will stay as a function
 * that accepts an initial state object. As for right now we do not initialize
 * our app with state so we're exporting this as an executed function.
 *
 * @param preloadedState any {}
 */
function configureStore(preloadedState: {}) {
  const store = createStore(
    reducers,
    preloadedState,
    compose(applyMiddleware(...middleware))
  )

  if (isDev) {
    if (module.hot) {
      // Enable Webpack hot module replacement for reducers
      module.hot.accept('./reducers', () => {
        store.replaceReducer(reducers)
      })
    }
  }

  return store
}

export { useReduxState }
export default configureStore({})
