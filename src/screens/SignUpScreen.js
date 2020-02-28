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
        try {
            if (password.length < 6) {
                Alert.alert("Please enter more than 5 characters password");
                setDisableButton(false);
                return;
            }

            firebaseWrapper.SignUp(email, password, setDisableButton, props);
        }
        catch (error) {
            Alert.alert('An error has occured');
            console.log(error.toString());
        }
        console.log('done');
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
                            <Item floatingLabel>
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
                                rounded
                                primary
                                disabled={disableButton}
                            >
                                <Text style={{ color: 'white' }}>Sign Up</Text>
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