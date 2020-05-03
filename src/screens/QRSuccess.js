import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ActivityIndicator, Alert } from 'react-native';
import * as firebaseWrapper from '../components/firebaseWrapper';
import store from '../store/store';
import { BackHandler } from 'react-native';
import { getDeviceId, getManufacturer } from 'react-native-device-info';
import * as firebase from 'firebase';
import { Button } from 'native-base';
const QRSuccess = props => {

    const [comment, setComment] = useState('');
    const [enableActivityIndicator, setEnableActivityIndicator] = useState(false);

    const classEvent = props.navigation.getParam('classEvent', false);
    const scannedData = props.navigation.getParam('scannedData', undefined);

    const [activeButtons, setActiveButtons] = useState({
        'done': true,
        'exit': true,
        'scanAgain': false
    })

    const classEventAttendance = (deviceId, manufacturer) => {
        let currentTime = new Date().toString().substring(16, 24);
        const regNum = store.getState().studentDetails.regNumber;
        const time1 = currentTime + ':00';
        const time2 = scannedData.expiryTime.trim(' ') + ':00';
        const path = `${scannedData.teacherName}/${scannedData.eventType}/${scannedData.eventDate}/${scannedData.eventName}/attendance/${regNum}`
        const eventInformationPath = `${scannedData.teacherName}/${scannedData.eventType}/${scannedData.eventDate}/${scannedData.eventName}/eventInformation`
        firebase.database().ref(eventInformationPath).once('value')
            .then(snap => {
                return snap.val();
            })
            .then((e) => {
                if (e.secret === scannedData.eventSecret && time1 < time2) {
                    firebase.database().ref(path).update({
                        'attendanceMarked': true,
                        'comment': comment,
                        'time': currentTime,
                        'deviceId': deviceId,
                        'manufacturer': manufacturer,

                    })
                        .then(() => {
                            Alert.alert("Attendance Marked");
                            setEnableActivityIndicator(false);
                            setActiveButtons({
                                'done': false,
                                'exit': true,
                                'scanAgain': false
                            });
                        })
                        .catch(err => {
                            Alert.alert('Error', err.message);
                            setButtonsOnError();
                        });
                }
                else if (scannedData.eventSecret != e.secret) {
                    Alert.alert('Error', 'Secrets do not match!');
                    setButtonsOnError();
                }
                else if (currentTime > scannedData.expiryTime) {
                    Alert.alert('Error', 'Time Expired!');
                    setButtonsOnError();
                }
                else {
                    Alert.alert('Error', 'Please try again');
                    setButtonsOnError();
                }
            })
            .catch(err => {
                Alert.alert('Error', err.message);
                setButtonsOnError();
            })

    }

    const standAloneEventAttendance = (deviceId, manufacturer) => {
        let time = new Date().toString().substring(16, 24);
        fetch('https://www.google.com', { method: 'GET' })
            .then((response) => {
                return new Date(response.headers.get('Date')).toString().substr(16, 5);
            })
            .then(currentTime => {
                const dataScanned = store.getState().dataScanned;
                // console.log(e);
                const studentName = store.getState().studentDetails.name;
                const regNumber = store.getState().studentDetails.regNumber;
                const path = `${dataScanned.teacherName}/${dataScanned.eventType}/${dataScanned.eventDate}/${dataScanned.eventName}/attendance`;
                //check expiry time
                const time1 = currentTime + ':00';
                const time2 = dataScanned.eventExpiryTime.trim(' ') + ':00';
                //get eventInformation from firebase
                const eventInformationPath = `${dataScanned.teacherName}/${dataScanned.eventType}/${dataScanned.eventDate}/${dataScanned.eventName}/eventInformation`
                firebase.database().ref(eventInformationPath).once('value')
                    .then(snap => {
                        return snap.val();//returns object named eventInformation 
                    })
                    .then(e => {
                        console.log(e.secret);
                        console.log(dataScanned.eventSecret);
                        console.log(time1);
                        console.log(time2);

                        if (e.secret === dataScanned.eventSecret && time1 < time2) {
                            let obj = {};
                            obj[regNumber] = {
                                'name': studentName,
                                'comment': comment,
                                'time': currentTime,
                                'deviceId': deviceId,
                                'manufacturer': manufacturer,
                                'attendanceMarked': 'true'
                            }
                            firebase.database().ref(path).push().set(obj)
                                .then(() => {
                                    Alert.alert("Attendance Marked");
                                    setEnableActivityIndicator(false);
                                    setActiveButtons({
                                        'done': false,
                                        'exit': true,
                                        'scanAgain': false
                                    });
                                })
                                .catch((err) => {
                                    Alert.alert('Error', err.message);
                                    setButtonsOnError();

                                });
                        }
                        else if (dataScanned.eventSecret != e.secret) {
                            Alert.alert('Error', 'Secrets do not match!');
                            setButtonsOnError();
                        }
                        else if (currentTime > dataScanned.eventExpiryTime) {
                            Alert.alert('Error', 'Time Expired!');
                            setButtonsOnError();
                        }
                        else {
                            Alert.alert('Error', 'Please try again');
                            setButtonsOnError();
                        }
                    })
                    .catch(err => {
                        Alert.alert('Error', err.message);
                        setButtonsOnError();
                    });

            })
            .catch(err => {
                Alert.alert('Error', err.message);
                setButtonsOnError();
            })

    }
    const onDonePress = () => {
        // console.log(store.getState().dataScanned);
        setActiveButtons({
            'done': false,
            'exit': false,
            'scanAgain': false
        });
        const deviceId = getDeviceId();
        let manufacturer = 'null';
        getManufacturer()
            .then(m => {
                manufacturer = m;
            })
            .catch(e => {
                // Alert.alert(e.message);
                manufacturer = 'null';
            });
        setEnableActivityIndicator(true);
        if (classEvent) {
            classEventAttendance(deviceId, manufacturer);
            return;
        }
        standAloneEventAttendance(deviceId, manufacturer);


    }

    const setButtonsOnError = () => {
        setEnableActivityIndicator(false);
        setActiveButtons({
            'done': false,
            'exit': true,
            'scanAgain': true
        });
    }

    const onExitPress = () => {
        BackHandler.exitApp();
    }

    const onScanAgain = () => {
        props.navigation.navigate('QRScan');
    }

    return (
        <View style={styles.screen}>
            <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 20, padding: 20, textAlign:'center' }}>Please enter any additional comments and press done </Text>
            <ActivityIndicator animating={enableActivityIndicator} />
            <View style={styles.textInputView}>
                <Text style={{ fontSize: 18, marginBottom: 10 }}>Additional Comments</Text>
                <TextInput
                    style={styles.textArea}
                    maxLength={100}
                    multiline
                    numberOfLines={4}
                    onChangeText={text => setComment(text)}
                    value={comment} />
                <View style={styles.buttonArea}>
                    <Button
                        full
                        onPress={onDonePress}
                        style={!activeButtons.done ? { width: '45%', borderRadius: 6, backgroundColor: '#bdbdbd' } : { width: '45%', borderRadius: 6, backgroundColor: '#26a69a' }}
                    >
                        <Text style={{ color: 'white', fontSize: 18 }}>Done</Text>
                    </Button>
                    <Button
                        full
                        style={!activeButtons.exit ? { width: '45%', borderRadius: 6, backgroundColor: '#bdbdbd' } : { width: '45%', borderRadius: 6, backgroundColor: '#e57373' }}
                        onPress={onExitPress}>

                        <Text style={{ color: 'white', fontSize: 18 }}> Exit</Text>
                    </Button>

                    {/* <View style={styles.button}>
                        <Button title='Done' disabled={!activeButtons.done} onPress={onDonePress} />
                    </View>
                    <View style={styles.button}>
                        <Button title='Exit' disabled={!activeButtons.exit} onPress={onExitPress} />
                    </View> */}

                </View>
                <View style={styles.button}>
                    <Button
                        full
                        onPress={onScanAgain}
                        style={!activeButtons.scanAgain ? { borderRadius: 6, marginTop: 10, backgroundColor: '#bdbdbd' } : { borderRadius: 6, marginTop: 10, backgroundColor: '#26a69a' }}
                    >
                        <Text style={{ color: 'white', fontSize: 18 }}>Scan Again</Text>
                    </Button>
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
        backgroundColor: '#b2dfdb',
        width: '90%'
    },
    buttonArea: {
        justifyContent: 'space-around',
        flexDirection: 'row',
        width: '100%',        
        marginTop: 20
    },
    button: {
        width: '50%',
        padding: 10
    }
})

export default QRSuccess;