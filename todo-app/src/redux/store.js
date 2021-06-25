import { createStore } from 'redux';
import mainReducer from './reducer';

const initialState = []

const store = createStore(
    mainReducer,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;