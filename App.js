/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useEffect } from 'react';
import DigitendanceNavigator from './src/navigation/DigitendanceNavigator';
import { createStore, combineReducers } from 'redux';
import locationReducer from './src/store/reducers/location'
import { Provider, useDispatch } from 'react-redux';
import { useState } from 'react';
import { Text, Alert } from 'react-native';
import { PermissionsAndroid } from 'react-native';
import { setLocation } from './src/store/actions/location';

const rootReducer = combineReducers({
  location: locationReducer
})

const store = createStore(rootReducer);

const App: () => React$Node = () => {

  const [access, setAccess] = useState(false);

  async function hasLocation() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
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
    store.dispatch(setLocation());
    // an api call within reducer is a no no
    console.log(store.getState());
    console.log("jhgjhjh");
  }, []);


  return (

    <Provider store={store}>
      {access ? (
        <DigitendanceNavigator />
      )
        : (
          <Text>Please Enable Location and Restart the app</Text>
        )}
    </Provider>
  );
};


export default App;
