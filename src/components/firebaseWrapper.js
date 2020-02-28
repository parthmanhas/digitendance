import { Alert } from 'react-native';
import * as firebase from 'firebase';
import store from '../store/store';
import { getDeviceId, getManufacturer } from 'react-native-device-info';

const ADD_RADIUS = 250;

export function SignUp(email, password, setDisableButton, props) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(() => {
            Alert.alert("Sign Up Successful! Please Login!");
            setDisableButton(false);
            props.navigation.pop();
        })
        .catch(error => {
            Alert.alert(error.message);
            setDisableButton(false);
        })
}

export function Login(email, password, props, setShowActivityIndicator) {
    //$TODO REMOVE THIS LOGIN
    // email = 'student1@gmail.com';
    // password = 'student1';
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => {
            setShowActivityIndicator(false);
            props.navigation.navigate('EnterDetails');
        })
        .catch(error => {
            Alert.alert(error.message);
            setShowActivityIndicator(false);
        });
}

export function QRCodeScan(data, studentName, regNumber, comment, time, setEnableScan) {

    const db = firebase.database();

    const path = `${data.teacherName}/${data.eventDate}/${data.eventName}`;
    const eventInformationPath = path + '/eventInformation';
    const attendancePath = path + '/attendance';
    // console.log(path);
    let eventInformation;
    let deviceId;
    let manufacturer;

    deviceId = getDeviceId();
    getManufacturer()
        .then(m => manufacturer = m)
        .catch(e => {
            // Alert.alert(e.message);
            manufacturer= 'null';
        })


    if (path) {
        // let data;
        // console.log(attendancePath);
        // firebase.database().ref(attendancePath).once('value')
        //     .then(snap => {
        //         data = snap.val();
        //         console.log(data);
        //         for (const uniqueKey in data) {
        //             for (const value in data[uniqueKey]) {
        //                 if (value === 'deviceId' && deviceId === data[uniqueKey][value]) {
        //                     Alert.alert('Device has been already used!');
        //                     return;
        //                 }
        //             }
        //         }
        //         return;
        //     })
        //     .then(() => { })

        firebase.database().ref(eventInformationPath).once('value')
            .then((snap) => {
                eventInformation = snap.val();
            })
            .then(() => {
                let x1 = Number(eventInformation.coords.latitude);
                let y1 = Number(eventInformation.coords.longitude);
                let r = Number(eventInformation.coords.accuracy);

                let currentLocation = store.getState().location;

                let x = Number(currentLocation.latitude);
                let y = Number(currentLocation.longitude);

                let addRadius = ADD_RADIUS;
                r += addRadius;

                let eventSecretScanned = store.getState().dataScanned.eventSecretScanned;

                if (eventInformation.secret === eventSecretScanned) {

                    if (((x - x1) * (x - x1) + (y - y1) * (y - y1) - r * r) < 0) {
                        let attendance = db.ref(attendancePath).push();
                        attendance
                            .set({
                                regNumber: regNumber,
                                name: studentName,
                                time: time,
                                comment: comment,
                                deviceId: deviceId,
                                manufacturer: manufacturer
                            })
                            .then(() => {
                                Alert.alert("Attendance Marked");
                                setEnableScan(true);

                            })
                            .catch((error) => {
                                Alert.alert(error.message);
                                setEnableScan(false);

                            });
                    }
                    else {
                        Alert.alert("Please be present near teacher!");
                        setEnableScan(false);
                    }
                }
                else{
                    Alert.alert('Invalid event secret');
                    setEnableScan(false);
                }
            })
            .catch((error) => {
                Alert.alert(error.message);
            })

    }

}


