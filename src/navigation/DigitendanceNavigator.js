import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from '../screens/HomeScreen';
import QRCodeScanScreen from '../screens/QRCodeScanScreen';
import SignUpScreen from '../screens/SignUpScreen';
import EnterDetailsScreen from '../screens/EnterDetailsScreen';
import QRSuccess from '../screens/QRSuccess';


const DigitendanceNavigator = createStackNavigator({
    Home: {
        screen: HomeScreen,
    },
    QRScan: {
        screen: QRCodeScanScreen,
    },
    SignUpScreen: {
        screen: SignUpScreen,
    },
    EnterDetails: {
        screen: EnterDetailsScreen,
    },
    Success: {
        screen: QRSuccess,
    },
}, {
    defaultNavigationOptions:{
        headerShown: false
    }
});

export default createAppContainer(DigitendanceNavigator);

