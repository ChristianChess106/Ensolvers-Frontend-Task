import thunk from 'redux-thunk';
import {createStore,combineReducers, applyMiddleware, compose} from 'redux';
import { todoReducer } from '../reducers/todoReducer';

const composeEnhancers =
  (typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const reducers = combineReducers({
    todo: todoReducer
});
// applyMiddleware(thunk)
export const store = createStore(reducers,composeEnhancers(applyMiddleware(thunk)));