import React, { useRef } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Button, Alert } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';

const QRCodeScanScreen = props => {

    const scanAgain = useRef(null);

    const onSuccess = e => {
        Alert.alert(e.data);
    }

    const onScanAgain = () => {
        scanAgain.current.reactivate();
    }

    return (
        <QRCodeScanner
            onRead={onSuccess}
            fadeIn={true}
            ref={scanAgain}
            topContent={
                <Text style={styles.centerText}>
                    Scan QR Code
                </Text>
            }
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