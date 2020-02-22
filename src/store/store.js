import { createStore, combineReducers } from 'redux';
import locationReducer from '../store/reducers/location';
import studentDetailsReducer from '../store/reducers/studentDetails';
import dataScannedReducer from './reducers/dataScanned';

const rootReducer = combineReducers({
    location: locationReducer,
    studentDetails: studentDetailsReducer,
    dataScanned : dataScannedReducer
})

const store = createStore(rootReducer);

export default store;
