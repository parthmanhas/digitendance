import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Button, Alert, ActivityIndicator } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import store from '../store/store';
import { setDataScanned } from '../store/actions/dataScanned';
import base64 from 'react-native-base64';
import * as firebase from 'firebase';
import CryptoJS from 'react-native-crypto-js';

const QRCodeScanScreen = props => {

    const scanAgain = useRef(null);

    const studentName = store.getState().studentDetails.name;
    const regNumber = store.getState().studentDetails.regNumber;
    const [displayIndicator, setDisplayIndicator] = useState(false);
    const [secret, setSecret] = useState();
    const [scannedData, setScannedData] = useState(null);
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

        // let bytes = CryptoJS.AES.decrypt(ciphertext, 'secret key 123');
        // let originalText = bytes.toString(CryptoJS.enc.Utf8);

        console.log(e.data);

        let bytes = CryptoJS.AES.decrypt(e.data, 'digitendance');
        let splitData = bytes.toString(CryptoJS.enc.Utf8).split(';');
        //check the length after split!!!
        if (splitData.length !== 7) {
            //class event, data in base64
            const splitDecodedData = bytes.toString(CryptoJS.enc.Utf8).split('+');            
            const scannedData = {
                'teacherName': splitDecodedData[0],
                'name': splitDecodedData[1],
                'regNum': splitDecodedData[2],
                'eventName': splitDecodedData[3],
                'eventDate': splitDecodedData[4],
                'eventSecret': splitDecodedData[5],
                'eventTime': splitDecodedData[6],
                'expiryTime': splitDecodedData[7],
                'eventType': splitDecodedData[8]
            };

            for(let i in scannedData){
                console.log(i, scannedData[i]);
            }
            
            props.navigation.navigate('Success', {classEvent : true, scannedData: scannedData});
            
        }
        else {
            // console.log('standalone event');
            // console.log(splitData);
            let scannedData = {
                'teacherName': splitData[0],
                'eventName': splitData[1],
                'eventDate': splitData[2],
                'eventSecret': splitData[3],
                'eventTime': splitData[4],
                'eventExpiryTime': splitData[5],
                'eventType': splitData[6]

            };

            for(let i in scannedData){
                console.log(i, scannedData[i]);
            }

            store.dispatch(setDataScanned(scannedData));
            // console.log(store.getState());
            props.navigation.navigate('Success');
        }
        // // let bytes = CryptoJS.AES.decrypt(e.data, 'secret key 123');
        // // let originalText = bytes.toString(CryptoJS.enc.Utf8);
        // // Alert.alert(originalText)

    }
    // useEffect(() => {
    //     if (data.teacherName && data.eventName && data.eventDate && data.eventSecretScanned) {
    //         // console.log('asdadasdasd');
    //         // firebaseWrapper.QRCodeScan(data, studentName, regNumber);
    //         store.dispatch(setDataScanned(data));
    //         // console.log(store.getState());
    //         props.navigation.navigate('Success');

    //     }
    // }, [data]);


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