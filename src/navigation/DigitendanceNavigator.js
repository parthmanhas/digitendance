import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from '../screens/HomeScreen';
import QRCodeScanScreen from '../screens/QRCodeScanScreen';
import SignUpScreen from '../screens/SignUpScreen';
import EnterDetailsScreen from '../screens/EnterDetailsScreen';

const DigitendanceNavigator = createStackNavigator({
    Home: {
        screen: HomeScreen,
        navigationOptions:{
            title: 'Digitendance_Student'
        }
    },
    QRScan: QRCodeScanScreen,
    SignUp: SignUpScreen,
    EnterDetails: EnterDetailsScreen
});

export default createAppContainer(DigitendanceNavigator);

