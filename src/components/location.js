import Geolocation from 'react-native-geolocation-service';
import { PermissionsAndroid } from 'react-native';

export async function findMyLocation() {
    const granted = await requestCameraPermission();

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
            position => {
                const location = JSON.stringify(position);

                setLocation(location);
            },
            error => Alert.alert(error.message),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
    }

}