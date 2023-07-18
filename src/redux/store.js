
/**
 * import libraries
 */
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware, { END } from 'redux-saga'

/**
 * import reducer and middleware for store
 */
import rootReducer from './root-reducer'
import rootSaga from './root-saga'

/**
 * Creates a Redux middleware and connects the Sagas to the Redux Store
 */
const sagaMiddleware = createSagaMiddleware()

/**
 * Apply middleware to store
 * -----------------------------------------
 */
const bindMiddleware = (middleware) => {
    if (process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line global-require
        const { composeWithDevTools } = require('redux-devtools-extension')
        return composeWithDevTools(applyMiddleware(...middleware))
    }
    return applyMiddleware(...middleware)
}

/**
 * Ceeate store with reducer and middleware
 * -----------------------------------------
 */
function initStore (initialState = {}) {
    const store = createStore(
        rootReducer,
        initialState,
        bindMiddleware([sagaMiddleware]),
    )

    /**
   * If saga not running then run saga
   * -----------------------------------------
   */
    store.runSaga = () => {
        // Avoid running twice
        if (store.saga) { return }
        store.saga = sagaMiddleware.run(rootSaga)
    }

    /**
   * If saga not running then stop saga
   * -----------------------------------------
   */
    store.stopSaga = async () => {
        // Avoid running twice
        if (!store.saga) { return }
        store.dispatch(END)
        await store.saga.done
        store.saga = null
    }

    /**
   * Exec a saga process on a thread
   * -----------------------------------------
   */
    store.execSagaTasks = async (isServer, tasks) => {
        // run saga
        store.runSaga()
        // dispatch saga tasks
        tasks(store.dispatch)
        // Stop running and wait for the tasks to be done
        await store.stopSaga()
        // Re-run on client side
        if (!isServer) {
            store.runSaga()
        }
    }

    // Initial run
    store.runSaga()

    return store
}

export default initStore
