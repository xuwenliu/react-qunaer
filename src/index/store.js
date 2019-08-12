import { createStore, applyMiddleware, combineReducers } from 'redux';

import thunk from 'redux-thunk';
import rootReducers from './reducers';

export default createStore(
    combineReducers(rootReducers),
    {

    },
    applyMiddleware(thunk)
);
