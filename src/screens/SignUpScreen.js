import React, { useState } from 'react';
import { View, StyleSheet, Text, Alert, YellowBox } from 'react-native';
import { Container, Content, Header, Form, Input, Item, Button, Label, Spinner, Card, CardItem, Body } from 'native-base'
import * as firebaseWrapper from '../components/firebaseWrapper';

const SignUpScreen = props => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [disableButton, setDisableButton] = useState(false);

    const signUpUser = (email, password) => {
        // display error when something goes wrong
        setDisableButton(true);

        if (password.length < 6) {
            Alert.alert("Please enter more than 5 characters password");
            setDisableButton(false);
        }
        else {
            firebaseWrapper.SignUp(email.trim(), password.trim())
                .then((result) => {
                    setDisableButton(false);
                    Alert.alert('Sign Up successful! Please Log in')
                    props.navigation.pop();
                })
                .catch(err => {
                    Alert.alert('Error', err.message);
                    setDisableButton(false);
                })
        }

    }

    const handleEmailInput = email => {
        setEmail(email);
    }

    const handlePasswordInput = password => {
        setPassword(password);
    }

    return (
        <Container>
            <Content padder>
                <Card>
                    <CardItem header>
                        <Text style={styles.cardHeader}>Create Account</Text>
                    </CardItem>
                    <CardItem>
                        <Body>
                            <Item floatingLabel>
                                <Label>Email</Label>
                                <Input
                                    keyboardType="email-address"
                                    onChangeText={handleEmailInput}
                                    value={email}
                                />
                            </Item>
                            <Item floatingLabel style={{ marginTop: 10 }}>
                                <Label>Password</Label>
                                <Input
                                    secureTextEntry={true}
                                    onChangeText={handlePasswordInput}
                                    value={password}
                                />
                            </Item>
                            <Button
                                onPress={() => signUpUser(email, password)}
                                style={{ marginTop: 10 }}
                                full
                                style={disableButton ? { backgroundColor: '#bdbdbd', borderRadius: 6, marginTop: 15 } : { backgroundColor: '#26a69a', borderRadius: 6, marginTop: 15 }}
                                disabled={disableButton}
                            >
                                <Text style={{ color: 'white', fontSize: 18 }}>Sign Up</Text>
                            </Button>
                        </Body>
                    </CardItem>
                </Card>
            </Content>
        </Container>
    );
}

const styles = StyleSheet.create({
    cardHeader: {
        fontSize: 20,
        fontWeight: "bold",
    }
});

export default SignUpScreen;