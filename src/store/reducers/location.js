import { SET_LOCATION } from '../actions/location';
import Geolocation from 'react-native-geolocation-service';
import { PermissionsAndroid } from 'react-native';

const initialState = {
    lati: '',
    longi: '',
    accuracy: ''
};

const locationReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LOCATION:
            let currentState;
            async function findMyLocation() {
                if (PermissionsAndroid.RESULTS.GRANTED) {
                    Geolocation.getCurrentPosition(
                        position => {
                            // console.log(JSON.stringify(position));
                            // console.log(position.coords.latitude);
                            currentState = {
                                ...state,
                                lati: position.coords.latitude,
                                longi: position.coords.longitude,
                                accuracy: position.coords.accuracy
                            }
                            console.log(currentState)
                        },
                        error => Alert.alert(error.message),
                        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
                    );
                }
                return currentState
            }
            findMyLocation();
            
        default:
            console.log(state);
            return state;
    }
}

export default locationReducer;