import { combineReducers } from 'redux';

import live from './live/reducer';

const staticReducers = {
    live
}

export function createReducer(asyncReducers) {
    return combineReducers({
      ...staticReducers,
      ...asyncReducers
    })
}
