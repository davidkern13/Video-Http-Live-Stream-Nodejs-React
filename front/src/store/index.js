import { configureStore } from '@reduxjs/toolkit';
import { createReducer } from './reducers';

export const middlewares = [];

export function initialStore() {

    const store = configureStore({
        reducer: createReducer(),
        middleware: middlewares
    })

    store.asyncReducers = {};

    return store;
}

const store = initialStore();

export default store;