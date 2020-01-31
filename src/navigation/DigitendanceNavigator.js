import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from '../screens/HomeScreen';
import QRCodeScanScreen from '../screens/QRCodeScanScreen';

const DigitendanceNavigator = createStackNavigator({
    Home: HomeScreen,
    QRScan: QRCodeScanScreen
});

export default createAppContainer(DigitendanceNavigator);

