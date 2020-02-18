import React, { useState } from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import { Container, Content, Header, Form, Input, Item, Button, Label, Spinner } from 'native-base'
import * as firebaseWrapper from '../components/firebaseWrapper';
import Geolocation from 'react-native-geolocation-service';
import { PermissionsAndroid } from 'react-native';

const HomeScreen = props => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showActivityIndicator, setShowActivityIndicator] = useState(false);

    const [location, setLocation] = useState('');


    async function findMyLocation() {
        const granted = await requestCameraPermission();

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            Geolocation.getCurrentPosition(
                position => {
                    const location = JSON.stringify(position);

                    setLocation(location);
                },
                error => Alert.alert(error.message),
                { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
            );
        }

    }


    async function requestCameraPermission() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: 'Cool Photo App Camera Permission',
                    message:
                        'Cool Photo App needs access to your camera ' +
                        'so you can take awesome pictures.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            return granted
        } catch (err) {
            console.warn(err);
        }
    }

    const loginUser = (email, password) => {
        //add email validation
        //dislay error when validation goes wrong
        setShowActivityIndicator(true);
        firebaseWrapper.Login(email, password, props, setShowActivityIndicator)
    }

    return (

        <Container style={styles.screen}>
            <Form>
                <Item floatingLabel>
                    <Label>Email</Label>
                    <Input
                        onChangeText={(text) => setEmail(text)}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                </Item>
                <Item floatingLabel>
                    <Label>Password</Label>
                    <Input
                        secureTextEntry={true}
                        onChangeText={(text) => setPassword(text)}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                </Item>
                <Spinner animating={showActivityIndicator} />
                <View>
                    <Button
                        full
                        rounded
                        success
                        disabled={showActivityIndicator}
                        onPress={() => loginUser(email, password)}
                    >
                        <Text style={{ color: 'white' }}>Login</Text>
                    </Button>
                </View>

                <View>
                    <Button
                        onPress={() => props.navigation.navigate('SignUp')}
                        style={{ marginTop: 10 }}
                        full
                        rounded
                        primary
                        disabled={showActivityIndicator}
                    >
                        <Text style={{ color: 'white' }}>Sign Up</Text>
                    </Button>
                    <Button style={{ margin: 10 }} rounded  full>
                        <Text>Find Location</Text>
                    </Button>
                    <Text>{location}</Text>
                </View>
            </Form>
        </Container>

    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        justifyContent: 'center'
    }
});

export default HomeScreen;