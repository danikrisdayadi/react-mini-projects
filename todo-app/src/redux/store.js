import { createStore } from 'redux';
import mainReducer from './reducer';

const initialState = {}

const store = createStore(
    mainReducer,
    initialState
);

export default store;