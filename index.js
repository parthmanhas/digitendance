/**
 * @format
 */

import { AppRegistry, Alert } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import 'react-native-gesture-handler';
import * as firebase from 'firebase';
import { YellowBox } from 'react-native';
import _ from 'lodash';
import { PermissionsAndroid } from 'react-native';

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};

const firebaseConfig = {
  apiKey: "AIzaSyA2tPKcoAkn7jEafTBUgQjXlq56Mgyl1Bo",
  authDomain: "digitendance-ae1f3.firebaseapp.com",
  databaseURL: "https://digitendance-ae1f3.firebaseio.com",
  projectId: "digitendance-ae1f3",
  storageBucket: "digitendance-ae1f3.appspot.com",
  messagingSenderId: "407327706668",
  appId: "1:407327706668:web:12dce55cdde23493860b89"
};

firebase.initializeApp(firebaseConfig);

AppRegistry.registerComponent(appName, () => App);

