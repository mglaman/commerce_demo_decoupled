import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import reducers from '../reducers'

/**
 * @param preloadedState
 * @returns {Store<any, Action> & *}
 */
export default function configureStore(preloadedState) {
  return createStore(
    reducers,
    preloadedState,
    applyMiddleware(thunk)
  );
}
