import { SET_LOCATION } from '../actions/location';

const initialState = {
    latitude: '',
    longitude: '',
    accuracy: ''
};

const locationReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LOCATION:
            return {
                ...state,
                latitude: action.position.coords.latitude,
                longitude: action.position.coords.longitude,
                accuracy: action.position.coords.accuracy
            }
            
        default:
            return state;
    }
}

export default locationReducer;