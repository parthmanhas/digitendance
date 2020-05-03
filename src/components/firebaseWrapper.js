import { Alert } from 'react-native';
import * as firebase from 'firebase';
import store from '../store/store';
import { getDeviceId, getManufacturer } from 'react-native-device-info';

const ADD_RADIUS = 250;

export function SignUp(email, password) {
    return new Promise((resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(() => {
                resolve('success');
            })
            .catch(err => {
                reject(err);
            })
    })
}

export function Login(email, password, props, setShowActivityIndicator) {
    //$TODO REMOVE THIS LOGIN
    email = 'student1@gmail.com';
    password = 'student1';
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

export function QRCodeScan(comment, time) {

    const db = firebase.database();

    const studentName = store.getState().studentDetails.name;
    const regNumber = store.getState().studentDetails.regNumber;

    const data = store.getState().dataScanned;
    const path = `${data.teacherName}/${data.eventDate}/${data.eventName}`;
    const eventInformationPath = path + '/eventInformation';
    const attendancePath = path + '/attendance';
    // console.log(path);
    let eventInformation;
    let deviceId;
    let manufacturer;
    let currentTimeFromAnyGoodServer;

    const fetchTime = async () => {
        let response = await fetch('https://www.google.com', { method: 'GET' });
        currentTimeFromAnyGoodServer = new Date(response.headers.get('Date')).toString().substr(16, 5);
    }
    fetchTime();

    deviceId = getDeviceId();
    getManufacturer()
        .then(m => manufacturer = m)
        .catch(e => {
            // Alert.alert(e.message);
            manufacturer = 'null';
        })


    if (path) {
        firebase.database().ref(eventInformationPath).once('value')
            .then((snap) => {
                eventInformation = snap.val();
            })
            .then(() => {
                let eventSecretScanned = store.getState().dataScanned.eventSecretScanned;
                console.log(eventInformation.expiryTime);
                console.log(currentTimeFromAnyGoodServer);
                let time1 = currentTimeFromAnyGoodServer + ':00';
                let time2 = eventInformation.expiryTime.trim(' ') + ':00';
                console.log(time1);
                console.log(time2);
                console.log(time1 < time2);
                if (eventInformation.secret === eventSecretScanned && time1 < time2) {
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
                            setActiveButtons({
                                'done': false,
                                'exit': true,
                                'scanAgain': false
                            });

                        })
                        .catch((error) => {
                            Alert.alert(error.message);
                            setActiveButtons({
                                'done': false,
                                'exit': true,
                                'scanAgain': true
                            });
                        });
                }
                else if (eventInformation.secret != eventSecretScanned) {
                    Alert.alert('Invalid Secret, Please Try Again');
                    setActiveButtons({
                        'done': false,
                        'exit': true,
                        'scanAgain': true
                    });
                }
                else if (currentTimeFromAnyGoodServer > eventInformation.expiryTime) {
                    Alert.alert('Time expired');
                    setActiveButtons({
                        'done': false,
                        'exit': true,
                        'scanAgain': false
                    });
                }
                else {
                    Alert.alert('Attendance not marked, Please try again!');
                    setActiveButtons({
                        'done': false,
                        'exit': true,
                        'scanAgain': true
                    });
                }
            })


    }



    function verifyLocationAndThenMarkAttendance() {
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
                else {
                    Alert.alert('Invalid event secret');
                    setEnableScan(true);
                }
            })
            .catch((error) => {
                Alert.alert(error.message);
            })

    }
    setEnableActivityIndicator(false);
}


