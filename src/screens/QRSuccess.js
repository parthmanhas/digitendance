import React, { useState } from 'react';
import { View, Button, Text, StyleSheet, TextInput, ActivityIndicator } from 'react-native';
import * as firebaseWrapper from '../components/firebaseWrapper';
import store from '../store/store';
import { BackHandler } from 'react-native';

const QRSuccess = props => {

    const [text, setText] = useState('');
    const [disableDone, setDisableDone] = useState(false);

    const data = store.getState().dataScanned;
    const studentName = store.getState().studentDetails.name;
    const regNumber = store.getState().studentDetails.regNumber;

    const onDonePress = () => {
        setDisableDone(true);
        let time = new Date().toString().substring(16, 24);
        firebaseWrapper.QRCodeScan(data, studentName, regNumber, text, time);

    }

    const onExitPress = () => {
        BackHandler.exitApp();
    }

    return (
        <View style={styles.screen}>
            <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 20 }}>QR Scanned Success </Text>
            <View style={styles.textInputView}>
                <Text style={{ fontSize: 18, marginBottom: 10 }}>Additional Comments</Text>
                <TextInput
                    style={styles.textArea}
                    maxLength={100}
                    multiline
                    numberOfLines={4}
                    onChangeText={text => setText(text)}
                    value={text} />
                <View style={styles.buttonArea}>

                    <View style={styles.button}>
                        <Button title='Done' disabled={disableDone} onPress={onDonePress} />
                    </View>
                    <View style={styles.button}>
                        <Button title='Exit' onPress={onExitPress}/>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textInputView: {
        width: '90%',
        alignItems: 'center'
    },
    textArea: {
        backgroundColor: '#aaa',
        width: '90%'
    },
    buttonArea: {
        justifyContent: 'space-around',
        flexDirection: 'row',
        width: '90%'
    },
    button: {
        width: '50%',
        padding: 10
    }
})

export default QRSuccess;