/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useEffect } from 'react';
import DigitendanceNavigator from './src/navigation/DigitendanceNavigator';
import store from './src/store/store';
import { Provider } from 'react-redux';
import { useState } from 'react';
import { Text, Alert } from 'react-native';
import { PermissionsAndroid } from 'react-native';
import { setLocation } from './src/store/actions/location';
import Geolocation from 'react-native-geolocation-service';

console.disableYellowBox = true;

const App: () => React$Node = () => {

  const [access, setAccess] = useState(false);
  const [position, setPosition] = useState();

  async function hasLocation() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Digitendance Location Access',
          message:
            'Digitendance needs access to your location',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      setAccess(granted === PermissionsAndroid.RESULTS.GRANTED)
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    hasLocation();
    if (!position) {
      findMyLocation();
    }
    else {
      store.dispatch(setLocation(position));
    }
  }, [position]);

  async function findMyLocation() {
    if (PermissionsAndroid.RESULTS.GRANTED) {
      Geolocation.getCurrentPosition(
        position => {
          // console.log(JSON.stringify(position));
          // console.log(position.coords.latitude);
          setPosition(position);
        },
        error => Alert.alert(error.message),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      );
    }
  }

  return (

    <Provider store={store}>
      {access ? (
        <DigitendanceNavigator />
      )
        : (
          <Text style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>Please Enable Location and Restart the app</Text>
        )}
    </Provider>
  );
};


export default App;
