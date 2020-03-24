import React, { useState } from 'react';
import { View, Button, Text, StyleSheet, TextInput, ActivityIndicator } from 'react-native';
import * as firebaseWrapper from '../components/firebaseWrapper';
import store from '../store/store';
import { BackHandler } from 'react-native';

const QRSuccess = props => {

    const [text, setText] = useState('');
    const [enableActivityIndicator, setEnableActivityIndicator] = useState(false);

    const [activeButtons, setActiveButtons] = useState({
        'done': true,
        'exit': true,
        'scanAgain': false
    })

    const data = store.getState().dataScanned;
    
    const onDonePress = () => {
        // console.log(store.getState().dataScanned);
        let time = new Date().toString().substring(16, 24);
        firebaseWrapper.QRCodeScan(data, text, time, setActiveButtons, setEnableActivityIndicator);

    }

    const onExitPress = () => {
        BackHandler.exitApp();
    }

    const onScanAgain = () => {
        props.navigation.navigate('QRScan');
    }

    return (
        <View style={styles.screen}>
            <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 20 }}>QR Scanned Success </Text>
            <ActivityIndicator animating={enableActivityIndicator} />
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
                        <Button title='Done' disabled={!activeButtons.done} onPress={onDonePress} />
                    </View>
                    <View style={styles.button}>
                        <Button title='Exit' disabled={!activeButtons.exit} onPress={onExitPress} />
                    </View>

                </View>
                <View style={styles.button}>
                    <Button title='Scan Again' disabled={!activeButtons.scanAgain} onPress={onScanAgain} />
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