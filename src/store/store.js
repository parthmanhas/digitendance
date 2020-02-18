import { createStore, combineReducers } from 'redux';
import locationReducer from '../store/reducers/location';

const rootReducer = combineReducers({
    location: locationReducer
})

const store = createStore(rootReducer);

export default store;
