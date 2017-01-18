import { applyMiddleware, createStore, compose, combineReducers } from "redux"
import {reducer} from '../../../lib'

import thunk from "redux-thunk"
import promise from "redux-promise-middleware"

const middleware = applyMiddleware(
    promise(),
    thunk
)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(combineReducers({
    oauth:reducer
}) , composeEnhancers(
    middleware
))
