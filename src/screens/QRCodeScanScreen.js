import React, { useState, useRef } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Button, Alert } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import CryptoJS from "react-native-crypto-js";
import * as firebase from 'firebase';
import { TextInput } from 'react-native-gesture-handler';

const QRCodeScanScreen = props => {

    const scanAgain = useRef(null);

    const regNumber = props.navigation.getParam('studentRegNumber', undefined);
    console.log(regNumber);

    const onSuccess = e => {
        // let bytes = CryptoJS.AES.decrypt(e.data, 'secret key 123');
        // let originalText = bytes.toString(CryptoJS.enc.Utf8);
        // Alert.alert(originalText);
        if (!e.data) {
            Alert.alert("Error! Please Scan Again.");
            return;
        }

        if (regNumber.length != 9) {
            Alert.alert("Incorrect Registration Number! Enter Again");
            return;
        }

        const data = e.data.split(';');
        const teacherName = data[0];
        const lectureName = data[1];
        const lectureDate = data[2];

        if (!teacherName || !lectureName || !lectureDate) {
            Alert.alert("Error");
            return;
        }
        const db = firebase.database();
        let attendance = db.ref(`${teacherName}/${lectureDate}/${lectureName}`).push();
        attendance
        .update({ regNumber })
        .then(() => Alert.alert("Attendance Marked"))
        .catch((error) => Alert.alert(error.message));
    }

    const onScanAgain = () => {
        scanAgain.current.reactivate();
    }

    return (
        <QRCodeScanner
            onRead={onSuccess}
            fadeIn={true}
            ref={scanAgain}
            bottomContent={
                // <Button title="Scan Again" onPress={onScanAgain} />
                <TouchableOpacity style={styles.buttonTouchable} onPress={onScanAgain}>
                    <Text style={styles.buttonText}>Scan Again</Text>
                </TouchableOpacity>
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