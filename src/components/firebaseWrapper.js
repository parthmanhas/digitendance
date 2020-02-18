import { Alert } from 'react-native';
import * as firebase from 'firebase';

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

export function QRCodeScan(data, setSecret, setPath, setDisplayIndicator, studentName, regNumber) {

    const db = firebase.database();

    setPath(`${data.teacherName}/${data.eventDate}/${data.eventName}`);

    if (path) {
        firebase.database().ref(path + '/secret').once('value')
            .then((snap) => {
                setSecret(snap.val());
            })
            .catch((error) => {
                Alert.alert(error.message);
                setSecret();
                setDisplayIndicator(false);
            })
    }

    if (secret === data.eventSecretScanned) {
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
}

