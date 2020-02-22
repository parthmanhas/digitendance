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
        navigationOptions: {
            headerShown: false,
        }
    },
    QRScan: {
        screen: QRCodeScanScreen,
        navigationOptions: {
            title: 'Scan QR'
        }
    },
    SignUp: {
        screen: SignUpScreen,
        navigationOptions: {
            title: 'Sign Up Here!'
        }
    },
    EnterDetails: {
        screen: EnterDetailsScreen,
        navigationOptions: {
            title: 'Please Enter your details Carefully'
        }
    },
    Success: {
        screen: QRSuccess,
    },
});

export default createAppContainer(DigitendanceNavigator);

