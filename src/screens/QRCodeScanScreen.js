import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Button, Alert, ActivityIndicator } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import store from '../store/store';
import { setDataScanned } from '../store/actions/dataScanned';

const QRCodeScanScreen = props => {

    const scanAgain = useRef(null);

    // const regNumber = props.navigation.getParam('studentRegNumber', undefined);
    // const studentName = props.navigation.getParam('studentName', undefined);
    const studentName = store.getState().studentDetails.name;
    const regNumber = store.getState().studentDetails.regNumber;
    const [displayIndicator, setDisplayIndicator] = useState(false);
    const [secret, setSecret] = useState();
    const [scannedData, setScannedData] = useState(null);
    const [data, setData] = useState({
        'teacherName': null,
        'eventName': null,
        'eventDate': null,
        'eventSecretScanned': null
    });
    const [path, setPath] = useState();




    const onSuccess = e => {
        if (!e.data) {
            Alert.alert("Error! Please Scan Again.");
            setDisplayIndicator(false);
            return;
        }

        if (regNumber.length != 9) {
            Alert.alert("Incorrect Registration Number! Enter Again");
            setDisplayIndicator(false);
            return;
        }
        setDisplayIndicator(true);
        setScannedData(e);

        //global access to data scanned
        

        const splitData = e.data.split(';');
        setData({
            'teacherName': splitData[0],
            'eventName': splitData[1],
            'eventDate': splitData[2],
            'eventSecretScanned': splitData[3]
        });

        // // let bytes = CryptoJS.AES.decrypt(e.data, 'secret key 123');
        // // let originalText = bytes.toString(CryptoJS.enc.Utf8);
        // // Alert.alert(originalText)

    }
    useEffect(() => {
        if (data.teacherName && data.eventName && data.eventDate && data.eventSecretScanned) {
            // console.log('asdadasdasd');
            // firebaseWrapper.QRCodeScan(data, studentName, regNumber);
            store.dispatch(setDataScanned(data));
            // console.log(store.getState());
            props.navigation.navigate('Success');

        }
    }, [data]);


    const onScanAgain = () => {
        scanAgain.current.reactivate();
    }

    return (
        <QRCodeScanner
            onRead={onSuccess}
            fadeIn={true}
            ref={scanAgain}
            bottomContent={
                <View>
                    {/* <ActivityIndicator animating={displayIndicator} /> */}
                    <TouchableOpacity style={styles.buttonTouchable} onPress={onScanAgain}>
                        <Text style={styles.buttonText}>Scan Again</Text>
                    </TouchableOpacity>
                </View>

            }
        />

    );
};

const styles = StyleSheet.create({
    centerText: {
        flex: 1,
        fontSize: 18,
        padding: 32,
        color: '#777',
    },
    textBold: {
        fontWeight: '500',
        color: '#000',
    },
    buttonText: {
        fontSize: 21,
        color: 'rgb(0,122,255)',
    },
    buttonTouchable: {
        padding: 16,
    },
});

export default QRCodeScanScreen;