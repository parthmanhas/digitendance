import { Alert } from 'react-native';
import * as firebase from 'firebase';
import store from '../store/store';

export function SignUp(email, password) {
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

export function QRCodeScan(data, studentName, regNumber, setDisplayIndicator) {

    const db = firebase.database();

    const path = `${data.teacherName}/${data.eventDate}/${data.eventName}`;
    console.log(path);
    let eventInformation;


    if (path) {
        firebase.database().ref(path + '/eventInformation').once('value')
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
                console.log();

                if (eventInformation.secret === data.eventSecretScanned &&
                    ((x - x1) * (x - x1) + (y - y1) * (y - y1) - r * r) < 0) {
                    let attendance = db.ref(path + '/attendance').push();
                    attendance
                        .set({ regNumber: regNumber, name: studentName })
                        .then(() => {
                            Alert.alert("Attendance Marked");
                            setDisplayIndicator(false);
                        })
                        .catch((error) => {
                            Alert.alert(error.message);
                            setDisplayIndicator(false);
                        });
                }
            })
            .catch((error) => {
                Alert.alert(error.message);
                setDisplayIndicator(false);
            })

    }

    //check whether current coords coincide with noted coords
    console.log(store.getState());


}

